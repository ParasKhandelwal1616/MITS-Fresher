const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'clubAdmin', 'student'],
    default: 'student',
  },
  associatedClub: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
  },
});

module.exports = mongoose.model('User', UserSchema);
