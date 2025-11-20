const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  mainImageUrl: {
    type: String,
    required: true,
  },
  googleFormLink: {
    type: String,
  },
  promoVideoUrl: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  clubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', EventSchema);
