const express = require('express');
//for security
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../auth/config');

const router = express.Router();
const User = require('../model/User');

//login
router.post('/login', (req, res)=>{
    User.findOne({ email: req.body.email }, (err, user) =>{
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, token: token });
    });
});

module.exports = router;
