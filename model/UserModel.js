const mongoose = require('mongoose');
const { isEmail } = require('validator');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: false,
    trim: true,
    lowercase: true
  },
  lastname: {
    type: String,
    required: false,
    trim: true,
    lowercase: true
  },
  username: {
    type: String,
    required: false,
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
  },
  phone: {
    type: String,
    trim: true,
  },
  aboutme: {
    type: String
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  roles:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles"
    } 
  ],
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "groups"
    }
  ],
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratings"
    }
  ],
  preferences: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "preferences"
    }
  ],
  colleges: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'colleges'
    }
  ],
  campuses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'campuses'
    }
  ],
  programs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'programs'
    }
  ],
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'courses'
    }
  ],
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'projects'
    }
  ],
});

const User = mongoose.model("Users", UserSchema);
module.exports = User;