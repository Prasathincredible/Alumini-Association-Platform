const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String, // 'image' or 'video'
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Donation', donationSchema);