const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
   email: {
       type: String,
       required: true
   },
    password: {
        type: String,
        required: true
    }
});

mongoose.model("User", UserSchema);
module.exports = mongoose.model('User');
