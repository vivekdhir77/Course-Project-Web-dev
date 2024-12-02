<<<<<<< HEAD
import express from "express";
import ListerDB from "./Lister.js";
import AllUserDB from "../AllUsers/allUsers.js";
import { authenticateToken } from "../middleware/auth.js";
import mongoose from "mongoose";
=======
import express from 'express';
import ListerDB from './Lister.js';
import AllUserDB from '../AllUsers/allUsers.js';
import { authenticateToken } from '../middleware/auth.js';
import mongoose from 'mongoose';
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e

const listerRouter = express.Router();

// CREATE- Add a new lister (without listings)
<<<<<<< HEAD
listerRouter.post("/listers", async (req, res) => {
  try {
    const { username, password, name, profile, defaultPic } = req.body;
    const existingUser = await AllUserDB.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists in AllUsers database" });
    }
    const newUser = new AllUserDB({
      username,
      password: password,
      role: "lister",
    });
    await newUser.save();

    const newLister = new ListerDB({
      username,
      password,
      name,
      profile,
      defaultPic,
      listings: [],
    });
    await newLister.save();
    res.status(201).json({ message: "Lister and user created successfully", lister: newLister });
  } catch (err) {
    console.error("Error creating lister:", err);
    res.status(500).json({ message: "Error creating lister", error: err.message });
  }
});

// CREATE- Add a new listing to an existing lister
listerRouter.post("/listers/:username/listings", authenticateToken, async (req, res) => {
  try {
    const { username } = req.params;
    const {
      distanceFromUniv,
      rent,
      description,
      numberOfRooms,
      numberOfBathrooms,
      squareFoot,
      address,
      latitude,
      longitude,
    } = req.body;

    console.log("Create listing params:", req.body);

    const lister = await ListerDB.findOne({ username });
    if (!lister) {
      return res.status(404).json({ message: "Lister not found" });
=======
listerRouter.post('/listers', async (req, res) => {
    try {
      const { username, password, name, profile, defaultPic } = req.body;
      const existingUser = await AllUserDB.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists in AllUsers database' });
      }
      const newUser = new AllUserDB({
        username,
        password: password,
        role: 'lister',
      });
      await newUser.save();
  
      const newLister = new ListerDB({
        username,
        password,
        name,
        profile,
        defaultPic,
        listings: [],
      });
      await newLister.save();
      res.status(201).json({ message: 'Lister and user created successfully', lister: newLister });
    } catch (err) {
      console.error('Error creating lister:', err);
      res.status(500).json({ message: 'Error creating lister', error: err.message });
    }
});
  
// CREATE- Add a new listing to an existing lister
listerRouter.post('/listers/:username/listings', authenticateToken, async (req, res) => {
  try {
    const { username } = req.params;
    const { distanceFromUniv, rent, description, numberOfRooms, numberOfBathrooms, squareFoot } = req.body;
    
    console.log('Creating listing:', {
      username,
      body: req.body,
      user: req.user
    });

    const lister = await ListerDB.findOne({ username });
    if (!lister) {
      return res.status(404).json({ message: 'Lister not found' });
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
    }

    const newListing = {
      _id: new mongoose.Types.ObjectId(), // Explicitly set the _id
      distanceFromUniv,
      rent,
      description,
      numberOfRooms,
      numberOfBathrooms,
<<<<<<< HEAD
      squareFoot,
      address,
      latitude,
      longitude,
=======
      squareFoot
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
    };

    lister.listings.push(newListing);
    await lister.save();

<<<<<<< HEAD
    res.status(201).json({ message: "Listing created successfully", listing: newListing });
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ message: "Error creating listing", error: error.message });
  }
});

// READ- Get lister by username
listerRouter.get("/listers/:username", async (req, res) => {
  try {
    const lister = await ListerDB.findOne({ username: req.params.username });
    if (!lister) {
      return res.status(404).json({ message: "Lister not found" });
    }
    res.status(200).json({ lister });
  } catch (err) {
    console.error("Error fetching lister:", err);
    res.status(500).json({ message: "Error fetching lister", error: err.message });
  }
});

// READ- Get all listings of all listers
listerRouter.get("/listings", async (req, res) => {
  try {
    const { distance, rent, rooms, bathrooms, squareFootage, address, latitude, longitude } =
      req.query;

    console.log("Here");

    // Find all listers
    const listers = await ListerDB.find({});
    let allListings = [];

    // Collect all listings
    listers.forEach((lister) => {
      allListings = [...allListings, ...lister.listings];
    });

    // Apply filters
    let filteredListings = allListings;

    if (distance) {
      const [min, max] = distance.split("-");
      filteredListings = filteredListings.filter((listing) => {
        if (max === "+") {
          return listing.distanceFromUniv >= parseFloat(min);
        }
        return (
          listing.distanceFromUniv >= parseFloat(min) && listing.distanceFromUniv <= parseFloat(max)
        );
      });
    }

    if (rent) {
      const [min, max] = rent.split("-");
      filteredListings = filteredListings.filter((listing) => {
        if (max === "+") {
=======
    console.log('Successfully created listing:', newListing);
    res.status(201).json({ message: 'Listing created successfully', listing: newListing });
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ message: 'Error creating listing', error: error.message });
  }
});
  
// READ- Get lister by username
listerRouter.get('/listers/:username', async (req, res) => {
try {
    const lister = await ListerDB.findOne({ username: req.params.username });
    if (!lister) {
    return res.status(404).json({ message: 'Lister not found' });
    }
    res.status(200).json({ lister });
} catch (err) {
    console.error('Error fetching lister:', err);
    res.status(500).json({ message: 'Error fetching lister', error: err.message });
}
});

// READ- Get all listings of all listers
listerRouter.get('/listings', async (req, res) => {
  try {
    const { distance, rent, rooms, bathrooms, squareFootage } = req.query;
    
    // Find all listers
    const listers = await ListerDB.find({});
    let allListings = [];
    
    // Collect all listings
    listers.forEach(lister => {
      allListings = [...allListings, ...lister.listings];
    });
    
    // Apply filters
    let filteredListings = allListings;
    
    if (distance) {
      const [min, max] = distance.split('-');
      filteredListings = filteredListings.filter(listing => {
        if (max === '+') {
          return listing.distanceFromUniv >= parseFloat(min);
        }
        return listing.distanceFromUniv >= parseFloat(min) && listing.distanceFromUniv <= parseFloat(max);
      });
    }
    
    if (rent) {
      const [min, max] = rent.split('-');
      filteredListings = filteredListings.filter(listing => {
        if (max === '+') {
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
          return listing.rent >= parseFloat(min);
        }
        return listing.rent >= parseFloat(min) && listing.rent <= parseFloat(max);
      });
    }
<<<<<<< HEAD

    if (rooms) {
      filteredListings = filteredListings.filter(
        (listing) => listing.numberOfRooms === parseInt(rooms)
      );
    }

    if (bathrooms) {
      filteredListings = filteredListings.filter(
        (listing) => listing.numberOfBathrooms === parseFloat(bathrooms)
      );
    }

    if (squareFootage) {
      const [min, max] = squareFootage.split("-");
      filteredListings = filteredListings.filter((listing) => {
        if (max === "+") {
=======
    
    if (rooms) {
      filteredListings = filteredListings.filter(listing => 
        listing.numberOfRooms === parseInt(rooms)
      );
    }
    
    if (bathrooms) {
      filteredListings = filteredListings.filter(listing => 
        listing.numberOfBathrooms === parseFloat(bathrooms)
      );
    }
    
    if (squareFootage) {
      const [min, max] = squareFootage.split('-');
      filteredListings = filteredListings.filter(listing => {
        if (max === '+') {
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
          return listing.squareFoot >= parseFloat(min);
        }
        return listing.squareFoot >= parseFloat(min) && listing.squareFoot <= parseFloat(max);
      });
    }

<<<<<<< HEAD
    // Filter by address
    if (address) {
      filteredListings = filteredListings.filter((listing) =>
        listing.address.toLowerCase().includes(address.toLowerCase())
      );
    }

    // Filter by latitude and longitude (for example within a certain radius)
    if (latitude && longitude) {
      const userLat = parseFloat(latitude);
      const userLon = parseFloat(longitude);
      filteredListings = filteredListings.filter((listing) => {
        const distance = getDistance(userLat, userLon, listing.latitude, listing.longitude);
        return distance <= 5; // For example, filter listings within 5 km radius
      });
    }

    res.status(200).json({ listings: filteredListings });
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).json({ message: "Error fetching listings", error: err.message });
=======
    res.status(200).json({ listings: filteredListings });
  } catch (err) {
    console.error('Error fetching listings:', err);
    res.status(500).json({ message: 'Error fetching listings', error: err.message });
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
  }
});

// READ- Get a specific listing of a lister
<<<<<<< HEAD
listerRouter.get("/listers/:username/listings/:listingId", async (req, res) => {
  try {
    const { username, listingId } = req.params;
    const lister = await ListerDB.findOne({ username });
    if (!lister) {
      return res.status(404).json({ message: "Lister not found" });
    }
    const listing = lister.listings.id(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    console.log("In listing", listing);

    res.status(200).json({ listing });
  } catch (err) {
    console.error("Error fetching specific listing:", err);
    res.status(500).json({ message: "Error fetching specific listing", error: err.message });
  }
});

// READ- Get all listings of a specific lister
listerRouter.get("/listers/:username/listings", async (req, res) => {
  try {
    console.log("Fetching listings for username:", req.params.username);
    const lister = await ListerDB.findOne({ username: req.params.username });

    if (!lister) {
      console.log("Lister not found for username:", req.params.username);
      return res.status(404).json({ message: "Lister not found" });
    }

    console.log("Found listings:", lister.listings);
    res.status(200).json({ listings: lister.listings });
  } catch (err) {
    console.error("Error fetching listings of lister:", err);
    res.status(500).json({ message: "Error fetching listings of lister", error: err.message });
=======
listerRouter.get('/listers/:username/listings/:listingId', async (req, res) => {
    try {
      const { username, listingId } = req.params;
      const lister = await ListerDB.findOne({ username });
      if (!lister) {
        return res.status(404).json({ message: 'Lister not found' });
      }
      const listing = lister.listings.id(listingId);
      if (!listing) {
        return res.status(404).json({ message: 'Listing not found' });
      }
  
      res.status(200).json({ listing });
    } catch (err) {
      console.error('Error fetching specific listing:', err);
      res.status(500).json({ message: 'Error fetching specific listing', error: err.message });
    }
});

// READ- Get all listings of a specific lister
listerRouter.get('/listers/:username/listings', async (req, res) => {
  try {
    console.log('Fetching listings for username:', req.params.username);
    const lister = await ListerDB.findOne({ username: req.params.username });
    
    if (!lister) {
      console.log('Lister not found for username:', req.params.username);
      return res.status(404).json({ message: 'Lister not found' });
    }
    
    console.log('Found listings:', lister.listings);
    res.status(200).json({ listings: lister.listings });
  } catch (err) {
    console.error('Error fetching listings of lister:', err);
    res.status(500).json({ message: 'Error fetching listings of lister', error: err.message });
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
  }
});

// UPDATE- Update an existing lister's listing by listingId
<<<<<<< HEAD
listerRouter.put("/listers/:username/listings/:listingId", authenticateToken, async (req, res) => {
  try {
    const { username, listingId } = req.params;
    const updateData = req.body;

    if (req.user.username !== username) {
      return res.status(403).json({ message: "Unauthorized to update this listing" });
=======
listerRouter.put('/listers/:username/listings/:listingId', authenticateToken, async (req, res) => {
  try {
    const { username } = req.params;
    const { listingId } = req.params;
    const updateData = req.body;

    // Verify the authenticated user matches the username in the route
    if (req.user.username !== username) {
      return res.status(403).json({ message: 'Unauthorized to update this listing' });
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
    }

    const lister = await ListerDB.findOne({ username });
    if (!lister) {
<<<<<<< HEAD
      return res.status(404).json({ message: "Lister not found" });
    }

    const listingIndex = lister.listings.findIndex(
      (listing) => listing._id.toString() === listingId
    );
    if (listingIndex === -1) {
      return res.status(404).json({ message: "Listing not found" });
=======
      return res.status(404).json({ message: 'Lister not found' });
    }

    const listingIndex = lister.listings.findIndex(listing => listing._id.toString() === listingId);
    if (listingIndex === -1) {
      return res.status(404).json({ message: 'Listing not found' });
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
    }

    // Update the listing
    lister.listings[listingIndex] = {
      ...lister.listings[listingIndex].toObject(),
      ...updateData,
<<<<<<< HEAD
      _id: lister.listings[listingIndex]._id, // Preserve the original _id
    };

    await lister.save();

    res.status(200).json({
      message: "Listing updated successfully",
      listing: lister.listings[listingIndex],
    });
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ message: "Error updating listing", error: error.message });
=======
      _id: lister.listings[listingIndex]._id // Preserve the original _id
    };

    await lister.save();
    
    res.status(200).json({ 
      message: 'Listing updated successfully',
      listing: lister.listings[listingIndex]
    });
  } catch (error) {
    console.error('Error updating listing:', error);
    res.status(500).json({ message: 'Error updating listing', error: error.message });
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
  }
});

// GET - Fetch a single listing
<<<<<<< HEAD
listerRouter.get("/listers/:username/listings/:listingId", authenticateToken, async (req, res) => {
  try {
    const { username, listingId } = req.params;

    const lister = await ListerDB.findOne({ username });
    if (!lister) {
      return res.status(404).json({ message: "Lister not found" });
=======
listerRouter.get('/listers/:username/listings/:listingId', authenticateToken, async (req, res) => {
  try {
    const { username, listingId } = req.params;
    
    const lister = await ListerDB.findOne({ username });
    if (!lister) {
      return res.status(404).json({ message: 'Lister not found' });
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
    }

    const listing = lister.listings.id(listingId);
    if (!listing) {
<<<<<<< HEAD
      return res.status(404).json({ message: "Listing not found" });
    }

    console.log("Here 1", listing);

    res.status(200).json({ listing });
  } catch (error) {
    console.error("Error fetching listing:", error);
    res.status(500).json({ message: "Error fetching listing", error: error.message });
=======
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.status(200).json({ listing });
  } catch (error) {
    console.error('Error fetching listing:', error);
    res.status(500).json({ message: 'Error fetching listing', error: error.message });
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
  }
});

// DELETE- Delete a listing from a lister
<<<<<<< HEAD
listerRouter.delete(
  "/listers/:username/listings/:listingId",
  authenticateToken,
  async (req, res) => {
    try {
      const { username, listingId } = req.params;
      console.log("Deleting listing:", { username, listingId });

      // Verify the authenticated user matches the username in the route
      if (req.user.username !== username) {
        return res.status(403).json({ message: "Unauthorized to delete this listing" });
      }

      const lister = await ListerDB.findOne({ username });
      if (!lister) {
        return res.status(404).json({ message: "Lister not found" });
      }

      const listingIndex = lister.listings.findIndex(
        (listing) => listing._id.toString() === listingId
      );
      if (listingIndex === -1) {
        return res.status(404).json({ message: "Listing not found" });
      }

      // Remove the listing
      lister.listings.splice(listingIndex, 1);
      await lister.save();

      res.status(200).json({ message: "Listing deleted successfully" });
    } catch (err) {
      console.error("Error deleting listing:", err);
      res.status(500).json({ message: "Error deleting listing", error: err.message });
    }
  }
);

// Delete the lister from the ListerDB and all users DB
listerRouter.delete("/listers/:username", authenticateToken, async (req, res) => {
  try {
    const { username } = req.params;
    const existingLister = await ListerDB.findOne({ username });
    if (!existingLister) {
      return res.status(404).json({ message: "Lister not found in ListerDB" });
    }
    await ListerDB.deleteOne({ username });
    await AllUserDB.deleteOne({ username });
    res.status(200).json({ message: "deleted from both DB's successfully" });
  } catch (err) {
    console.error("Error deleting lister:", err);
    res.status(500).json({ message: "Error deleting lister", error: err.message });
  }
});

=======
listerRouter.delete('/listers/:username/listings/:listingId', authenticateToken, async (req, res) => {
  try {
    const { username, listingId } = req.params;
    console.log('Deleting listing:', { username, listingId });

    // Verify the authenticated user matches the username in the route
    if (req.user.username !== username) {
      return res.status(403).json({ message: 'Unauthorized to delete this listing' });
    }

    const lister = await ListerDB.findOne({ username });
    if (!lister) {
      return res.status(404).json({ message: 'Lister not found' });
    }

    const listingIndex = lister.listings.findIndex(listing => listing._id.toString() === listingId);
    if (listingIndex === -1) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Remove the listing
    lister.listings.splice(listingIndex, 1);
    await lister.save();
    
    res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (err) {
    console.error('Error deleting listing:', err);
    res.status(500).json({ message: 'Error deleting listing', error: err.message });
  }
});

// Delete the lister from the ListerDB and all users DB
listerRouter.delete('/listers/:username', authenticateToken, async (req, res) => {
    try {
      const { username } = req.params;
      const existingLister = await ListerDB.findOne({ username });
      if (!existingLister) {
        return res.status(404).json({ message: 'Lister not found in ListerDB' });
      }
      await ListerDB.deleteOne({ username });
      await AllUserDB.deleteOne({ username });
      res.status(200).json({ message: 'deleted from both DB\'s successfully' });
    } catch (err) {
      console.error('Error deleting lister:', err);
      res.status(500).json({ message: 'Error deleting lister', error: err.message });
    }
  });
  
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
// Add the complete-profile route
listerRouter.post("/complete-profile", authenticateToken, async (req, res) => {
  try {
    const existingUser = await AllUserDB.findOne({ username: req.user.username });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found in AllUsers database" });
    }

    // Check if lister profile already exists
    const existingLister = await ListerDB.findOne({ username: req.user.username });
    if (existingLister) {
      return res.status(400).json({ message: "Lister profile already exists" });
    }

    // Create new lister profile with password from AllUsers
    const listerProfile = new ListerDB({
      username: req.user.username,
      password: existingUser.password,
      name: req.user.name,
      profile: req.body.profile,
      defaultPic: req.body.defaultPic,
      contactInfo: {
        email: req.body.contactInfo.email,
        phone: req.body.contactInfo.phone,
<<<<<<< HEAD
        preferredContact: req.body.contactInfo.preferredContact,
      },
      listings: [],
=======
        preferredContact: req.body.contactInfo.preferredContact
      },
      listings: []
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
    });

    await listerProfile.save();

    // Update AllUsers
    await AllUserDB.findOneAndUpdate(
      { username: req.user.username },
      { hasCompletedOnboarding: true }
    );

    res.status(201).json({
      message: "Profile completed successfully",
<<<<<<< HEAD
      lister: listerProfile,
    });
  } catch (error) {
    console.error("Profile completion error:", error);
    res.status(500).json({
      message: "Error completing profile",
      error: error.message,
=======
      lister: listerProfile
    });

  } catch (error) {
    console.error('Profile completion error:', error);
    res.status(500).json({ 
      message: "Error completing profile",
      error: error.message
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
    });
  }
});

// Add a profile route similar to the user profile route
listerRouter.get("/profile", authenticateToken, async (req, res) => {
  try {
    const lister = await ListerDB.findOne({ username: req.user.username });
    if (!lister) {
      return res.status(404).json({ message: "Lister not found" });
    }
    res.json(lister);
  } catch (error) {
<<<<<<< HEAD
    console.error("Error fetching profile:", error);
=======
    console.error('Error fetching profile:', error);
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
    res.status(500).json({ message: "Server error" });
  }
});

// Add update profile route
listerRouter.put("/update-profile", authenticateToken, async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      profile: req.body.profile,
      defaultPic: req.body.defaultPic,
      contactInfo: {
        email: req.body.contactInfo?.email,
        phone: req.body.contactInfo?.phone,
<<<<<<< HEAD
        preferredContact: req.body.contactInfo?.preferredContact,
      },
=======
        preferredContact: req.body.contactInfo?.preferredContact
      }
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
    };

    const updatedLister = await ListerDB.findOneAndUpdate(
      { username: req.user.username },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedLister) {
      return res.status(404).json({ message: "Lister not found" });
    }
<<<<<<< HEAD

    res.json(updatedLister);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
=======
    
    res.json(updatedLister);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ 
      message: "Server error",
      error: error.message 
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
    });
  }
});

// GET all listers
<<<<<<< HEAD
listerRouter.get("/listers", async (req, res) => {
  try {
    const listers = await ListerDB.find({}, "-password");
    res.status(200).json({ listers });
  } catch (err) {
    console.error("Error fetching listers:", err);
    res.status(500).json({ message: "Error fetching listers", error: err.message });
=======
listerRouter.get('/listers', async (req, res) => {
  try {
    const listers = await ListerDB.find({}, '-password');
    res.status(200).json({ listers });
  } catch (err) {
    console.error('Error fetching listers:', err);
    res.status(500).json({ message: 'Error fetching listers', error: err.message });
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
  }
});

// GET - Get a single listing
<<<<<<< HEAD
listerRouter.get("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Here MF");

    // Find all listers
    const listers = await ListerDB.find({});

=======
listerRouter.get('/listings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find all listers
    const listers = await ListerDB.find({});
    
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
    // Find the listing in any lister's listings array
    let foundListing = null;
    let foundLister = null;

    for (const lister of listers) {
<<<<<<< HEAD
      const listing = lister.listings.find((l) => l._id.toString() === id);
=======
      const listing = lister.listings.find(l => l._id.toString() === id);
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
      if (listing) {
        foundListing = listing;
        foundLister = {
          name: lister.name,
<<<<<<< HEAD
          contactInfo: lister.contactInfo,
        };
        console.log("Listing", listing.latitude);
=======
          contactInfo: lister.contactInfo
        };
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
        break;
      }
    }

    if (!foundListing) {
<<<<<<< HEAD
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json({
      listing: foundListing,
      lister: foundLister,
    });
  } catch (err) {
    console.error("Error fetching listing:", err);
    res.status(500).json({ message: "Error fetching listing", error: err.message });
=======
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.status(200).json({ 
      listing: foundListing,
      lister: foundLister
    });
  } catch (err) {
    console.error('Error fetching listing:', err);
    res.status(500).json({ message: 'Error fetching listing', error: err.message });
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
  }
});

export default listerRouter;
