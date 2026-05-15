const mongoose = require('mongoose');

const jobRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters'],
      maxlength: [100, 'Title must not exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [1000, 'Description must not exceed 1000 characters']
    },
    category: {
      type: String,
      enum: ['Plumbing', 'Electrical', 'Painting', 'Joinery', 'Carpentry', 'HVAC', 'Other'],
      default: 'Other'
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    contactName: {
      type: String,
      required: [true, 'Contact name is required'],
      trim: true
    },
    contactEmail: {
      type: String,
      required: [true, 'Contact email is required'],
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Closed'],
      default: 'Open'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('JobRequest', jobRequestSchema);
