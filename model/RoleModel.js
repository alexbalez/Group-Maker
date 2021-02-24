const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  users:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    } 
  ]
});

const Role = mongoose.model("Roles", RoleSchema);
module.exports = Role;