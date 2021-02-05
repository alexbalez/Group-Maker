const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please enter a first name'],
    trim: true,
    lowercase: true
  },
  lastname: {
    type: String,
    required: [true, 'Please enter a last name'],
    trim: true,
    lowercase: true //will convert and store as lowercase
  },
  salary: {
    type: Number,
    default: 0.0,
    validate(value) {
      if (value < 0.0) throw new Error("Negative Salary aren't real.");
    }
  },
});

//mongoose.model("<collection name>", schemaToAdd)
const Employee = mongoose.model("Employees", EmployeeSchema);
module.exports = Employee;