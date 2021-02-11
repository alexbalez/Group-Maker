const mongoose = require('mongoose');
const { isEmail } = require('validator');

const GroupSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: [isEmail, 'Please enter a valid email address'],
    unique: true
  }
  
const Group = mongoose.model("Groups", GroupSchema);
module.exports = Group;