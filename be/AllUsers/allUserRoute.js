import express from "express";
import AllUserDB from "./allUsers.js";
<<<<<<< HEAD
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
=======
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e

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
<<<<<<< HEAD
      name,
=======
      name
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
    });

    await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role, username: newUser.username, name: newUser.name },
      process.env.JWT_SECRET,
<<<<<<< HEAD
      { expiresIn: "24h" }
=======
      { expiresIn: '24h' }
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        username: newUser.username,
        role: newUser.role,
<<<<<<< HEAD
        name: newUser.name,
      },
    });
=======
        name: newUser.name
      }
    });

>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Sign In route
<<<<<<< HEAD
// Sign In route
allUserRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Admin login logic
    if (username === 'admin' && password === 'admin123') {
      return res.status(200).json({
        user: {
          id: "admin-1",
          username: "admin",
          name: "Admin User",
          role: "admin",
          hasCompletedOnboarding: true,
        },
=======
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
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
      });
    }

    // Regular user authentication
    const user = await AllUserDB.findOne({ username });
    if (!user) {
<<<<<<< HEAD
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare provided password with hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role, username: user.username, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        username: user.username,
        role: user.role,
        name: user.name
      }
    });
  } catch (error) {
    console.error("Sign in error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


=======
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

>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
export default allUserRouter;
