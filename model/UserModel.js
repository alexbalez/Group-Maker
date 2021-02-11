const mongoose = require('mongoose');
const { isEmail } = require('validator');
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new mongoose.Schema({
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
    unique: [true, "Username already taken!"]
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: [isEmail, 'Please enter a valid email address'],
    unique: true
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
  rating: [
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
UserSchema.plugin(uniqueValidator)

const User = mongoose.model("Users", UserSchema);
module.exports = User;