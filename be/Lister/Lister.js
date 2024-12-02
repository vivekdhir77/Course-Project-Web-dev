<<<<<<< HEAD
import mongoose from "mongoose";
=======
import mongoose from 'mongoose';

>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
const listingSchema = new mongoose.Schema({
  distanceFromUniv: {
    type: Number,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  numberOfRooms: {
    type: Number,
    required: true,
  },
  numberOfBathrooms: {
    type: Number,
    required: true,
  },
  squareFoot: {
    type: Number,
    required: true,
  },
<<<<<<< HEAD
  address: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
=======
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  }
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
});

const listerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: false,
  },
  profile: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  defaultPic: {
    type: String,
    default: null,
  },
  contactInfo: {
    type: {
      email: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        trim: true,
        default: null,
      },
      preferredContact: {
        type: String,
<<<<<<< HEAD
        enum: ["email", "phone"],
        default: "email",
=======
        enum: ['email', 'phone'],
        default: 'email',
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
      },
    },
    required: true,
  },
  listings: [listingSchema],
});

<<<<<<< HEAD
const ListerDB = mongoose.model("Lister", listerSchema);
=======
const ListerDB = mongoose.model('Lister', listerSchema);
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
export default ListerDB;
