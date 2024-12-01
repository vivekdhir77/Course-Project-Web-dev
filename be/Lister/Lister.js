import mongoose from 'mongoose';

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
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  }
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
        enum: ['email', 'phone'],
        default: 'email',
      },
    },
    required: true,
  },
  listings: [listingSchema],
});

const ListerDB = mongoose.model('Lister', listerSchema);
export default ListerDB;
