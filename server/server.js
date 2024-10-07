import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import cookie from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookie());
app.use(cors({
    origin: 'http://localhost:3000',  // React frontend's URL
    credentials: true,  // Allow credentials (cookies)
}));

const MONGO_URI = 'mongodb://localhost:27017/plus';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// User Schema and Model
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true},
    dob: { type: Date, required: true },
    gender: { type: String, required: true},
    password: { type: String, required: true },
   
});


const User = mongoose.model('User', userSchema);

// Middleware to protect routes
const verifyToken = (req, res, next) => {
    const token = req.cookies["accesToken"];
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, 'SECRET_KEY'); // Replace 'SECRET_KEY' with an environment variable in production
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

// Registration Route
// Registration Route
// Registration Route
app.post('/api/register', async (req, res) => {
    const { firstName, lastName, email, mobile, dob, gender, password, confirmPassword } = req.body;

    // Check if all fields are provided
    if (!firstName || !lastName || !email || !mobile || !dob || !gender || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if user already exists
    const emailExist = await User.findOne({ email });
    if (emailExist) return res.status(400).json({ message: 'Email already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create new user
    const user = new User({
        firstName,
        lastName,
        email,
        mobile,
        dob,
        gender,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.json({ message: 'User registered successfully', userId: savedUser._id });
    } catch (err) {
        console.error(err); // Log error to the console
        res.status(400).json({ message: 'Error in registration', error: err.message });
    }
});


// Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if email exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email not found' });

    // Verify password
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ message: 'Invalid password' });

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, 'SECRET_KEY', { expiresIn: '1h' });
    res.cookie("accesToken", token, { httpOnly: true });
    res.send({ message: 'Logged in successfully', token });
});

// Profile Route to get user data
app.get('/api/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password'); // Exclude password from response
        res.json(user); // Send the complete user data
    } catch (err) {
        res.status(400).json({ message: 'Error fetching user data' });
    }
});

// Protected Route
app.get('/api/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

// Logout Route
app.get('/api/logout', async (req, res) => {
    res.cookie("accesToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Logged Out Successfully.",
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





/*import app from './app.js'

app.listen(process.env.PORT,()=>{
    console.log(`server running on${process.env.PORT}`)
})
////////////////////
/*import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});*/