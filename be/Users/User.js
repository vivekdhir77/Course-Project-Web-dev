import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  profile: {
    type: String,
    default: null,
  },
  defaultPic: {
    type: String,
    default: null,
  },
  openToRoommateFind: {
    type: Boolean,
    default: false,
  },
  budget: {
    type: Number,
    required: true,
  },
  leaseDuration: {
<<<<<<< HEAD
    type: String,
    required: true,
    enum: ['Short-term', 'Long-term', 'Month-to-month'],
=======
    type: Number,
    required: true,
    min: 1,
    max: 12
>>>>>>> c5ed403b8f6f6b60f91f49cd821b9ab5b555b35e
  },
  smoking: {
    type: Boolean,
    default: false,
  },
  drinking: {
    type: Boolean,
    default: false,
  },
  openToMixedGender: {
    type: Boolean,
    default: false,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female'],
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
        enum: ['email', 'phone'],
        default: 'email',
      },
    },
    required: true,
  },
});

const UserDB = mongoose.model('User', userSchema);
export default UserDB;
