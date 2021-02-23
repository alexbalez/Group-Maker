
const User = require('../model/UserModel');
const express = require('express');
const app = express();

const { requireAuth } = require('../auth/authMiddleware');

// this uses the requreAuth middleware to check that there is a valid token on the client
// the requireAuth middleware also attaches the userid from the token to the req object
app.get('/dashboard', requireAuth, async (req, res) => {
    console.log(req.userid)
    const user = await User.findById({_id: req.userid})
    try {
        console.log(user)    
        res.json(user);
    }
    catch (err) {
        res.status(500).send(err);
    }

});


module.exports = app;