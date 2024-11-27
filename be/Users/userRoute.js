import express from "express";
import UserDB from "./User.js";
import AllUserDB from "../AllUsers/allUsers.js";
import { authenticateToken } from "../middleware/auth.js";

const userRouter = express.Router();

// Complete profile route
userRouter.post("/complete-profile", authenticateToken, async (req, res) => {
  try {
    const existingUser = await AllUserDB.findOne({ username: req.user.username });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found in AllUsers database" });
    }

    // Log the incoming data
    console.log('Creating profile with data:', {
      ...req.body,
      username: req.user.username,
      name: existingUser.name
    });

    // Create new user profile with explicit schema matching
    const userProfile = new UserDB({
      username: req.user.username,
      name: existingUser.name,
      gender: req.body.gender,
      openToRoommateFind: req.body.openToRoommateFind,
      budget: req.body.budget,
      leaseDuration: req.body.leaseDuration,
      smoking: req.body.smoking,
      drinking: req.body.drinking,
      openToMixedGender: req.body.openToMixedGender,
      contactInfo: {
        email: req.body.contactInfo.email,
        phone: req.body.contactInfo.phone,
        preferredContact: req.body.contactInfo.preferredContact
      }
    });

    // Log the user profile before saving
    console.log('User profile before save:', userProfile);

    // Save the profile
    await userProfile.save();

    // Fetch the saved profile to verify data
    const savedProfile = await UserDB.findById(userProfile._id);
    console.log('Saved profile from database:', savedProfile);

    // Update AllUsers
    await AllUserDB.findOneAndUpdate(
      { username: req.user.username },
      { hasCompletedOnboarding: true }
    );

    // Create response with explicit inclusion of contactInfo
    const responseData = {
      message: "Profile completed successfully",
      user: {
        ...savedProfile.toObject(),
        role: existingUser.role,
        hasCompletedOnboarding: true,
        contactInfo: savedProfile.contactInfo // Explicitly include contactInfo
      }
    };

    console.log('Final response data:', responseData);
    res.status(201).json(responseData);

  } catch (error) {
    console.error('Profile completion error:', error);
    res.status(500).json({ 
      message: "Error completing profile",
      error: error.message,
      stack: error.stack
    });
  }
});

// Get user profile
userRouter.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await UserDB.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update user profile
userRouter.put("/update-profile", authenticateToken, async (req, res) => {
  try {
    console.log('Received update request:', req.body);

    // Explicitly structure the update data
    const updateData = {
      name: req.body.name,
      gender: req.body.gender,
      openToRoommateFind: req.body.openToRoommateFind,
      budget: req.body.budget,
      leaseDuration: req.body.leaseDuration,
      smoking: req.body.smoking,
      drinking: req.body.drinking,
      openToMixedGender: req.body.openToMixedGender,
      contactInfo: {
        email: req.body.contactInfo?.email,
        phone: req.body.contactInfo?.phone,
        preferredContact: req.body.contactInfo?.preferredContact
      }
    };

    console.log('Structured update data:', updateData);

    const updatedUser = await UserDB.findOneAndUpdate(
      { username: req.user.username },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    console.log('Updated user in database:', updatedUser);
    res.json(updatedUser);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ 
      message: "Server error",
      error: error.message 
    });
  }
});

// Public route for searching roommates
userRouter.get("/potential-roommates", async (req, res) => {
  try {
    const query = {};
    
    // Add budget filter
    if (req.query.budget) {
      const [min, max] = req.query.budget.split('-').map(Number);
      query.budget = { $gte: min, $lte: max };
    }

    // Add lease duration filter
    if (req.query.leaseDuration) {
      query.leaseDuration = req.query.leaseDuration;
    }

    // Add smoking filter
    if (req.query.smoking) {
      query.smoking = req.query.smoking === 'smoking';
    }

    // Add drinking filter
    if (req.query.drinking) {
      query.drinking = req.query.drinking === 'drinking';
    }

    // Add gender preference filter
    if (req.query.genderPreference) {
      query.openToMixedGender = req.query.genderPreference === 'multiple-gender';
    }

    console.log('Final query:', query);
    
    const potentialRoommates = await UserDB.find(query);
    
    console.log('Found potential roommates:', potentialRoommates.length);
    
    res.json(potentialRoommates);
  } catch (error) {
    console.error('Error fetching potential roommates:', error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user profile by ID - Modified to handle public access
userRouter.get("/profile/:userId", async (req, res) => {
  try {
    const userProfile = await UserDB.findById(req.params.userId);
    
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    // Create a public version of the profile without sensitive information
    const publicProfile = {
      name: userProfile.name,
      budget: userProfile.budget,
      leaseDuration: userProfile.leaseDuration,
      gender: userProfile.gender,
      smoking: userProfile.smoking,
      drinking: userProfile.drinking,
      openToMixedGender: userProfile.openToMixedGender,
      profile: userProfile.profile
    };
    
    res.json(publicProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get full user profile by ID (protected route)
userRouter.get("/profile/:userId/full", authenticateToken, async (req, res) => {
  try {
    const userProfile = await UserDB.findById(req.params.userId);
    
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }
    
    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: "Server error" });
  }
});

export default userRouter;