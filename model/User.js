const mongoose = require('mongoose');
const { isEmail } = require('validator');


const UserSchema = mongoose.Schema({
   email: {
       type: String,
       required: true,
       validate: [isEmail, 'Please enter a valid email address']
   },
    password: {
        type: String,
        required: true
    },
    data:{
        type: String
    }
});

mongoose.model("User", UserSchema);
module.exports = mongoose.model('User');
