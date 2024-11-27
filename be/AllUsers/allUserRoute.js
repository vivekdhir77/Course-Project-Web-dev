import express from "express";
import AllUserDB from "./allUsers.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const allUserRouter = express.Router();

// Signup route
allUserRouter.post("/signup", async (req, res) => {
  try {
    const { username, password, role, name } = req.body;

    // Check if user already exists
    const existingUser = await AllUserDB.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new AllUserDB({
      username,
      password: hashedPassword,
      role,
      name
    });

    await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role, username: newUser.username, name: newUser.name },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        username: newUser.username,
        role: newUser.role,
        name: newUser.name
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Sign In route
allUserRouter.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Skip database check for admin login
    if (username === 'admin' && password === 'admin123') {
      return res.status(200).json({
        user: {
          id: 'admin-1',
          username: 'admin',
          name: 'Admin User',
          role: 'admin',
          hasCompletedOnboarding: true
        }
      });
    }

    // Regular user authentication
    const user = await AllUserDB.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password (you should use proper password hashing in production)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Sign in error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default allUserRouter;
