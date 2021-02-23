const express = require('express');
//for security
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../auth/config');

const router = express.Router();
const User = require('../model/UserModel'); //switched to kevins user model

const handleErrors = (err) =>{
    console.log(err)

    //todo: check the err object itself and return desireable messages from db
    return err
}

const createToken = (user) =>{
    return jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 }); //expires in 24 hours
}

// create cookie that contains token and attach to response object
const createCookie = (token, res) =>{
    //todo: when we switch to https use {secure: true} instead of {httpOnly: true}
    res.cookie('gmUserCookie', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
}

const destroyCookie = (res) =>{
    res.cookie('gmUserCookie', null, { expires: new Date(Date.now() + 5 * 1000), httpOnly: true})
}

//login
// Returns a jwt token as response on successful email lookup and password matching
router.post('/login', (req, res)=>{
    let errors = {}
    User.findOne({ email: req.body.email }, (err, user) =>{

        //check for misc db errors
        if (err){
            errors = handleErrors(err);
            return res.status(500).json(errors);
        } 
        //check for user found
        if (!user) {
            errors = handleErrors(err);
            return res.status(404).json(errors);
        }
        //check password
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            errors = handleErrors(err);
            return res.status(401).json(errors);
        }
        //create token, store in cookie, attach to response, and send response as json with userid
        const token = createToken(user); 
        createCookie(token, res)
        res.status(200).json({userid: user._id});
    });
});

router.post('/signup', (req, res)=>{
    let errors = {}
    const hashedPassword = bcrypt.hashSync(req.body.password, 8); //encrypt pw with Bcrypt’s hashing method
    const user = {
        email: req.body.email,
        password: hashedPassword
    };
    // Create new user based on Mongoose schema
    User.create(user, (err, user)=>{
        if (err) {
            errors = handleErrors(err);
            return res.status(500).json({message: "There was a problem registering the user.", errors});
        }
        //create token, store in cookie, attach to response, and send response as json with userid
        const token = createToken(user);
        createCookie(token, res);
        res.status(200).json({userid: user._id});
    });
});

router.post('/logout', (req, res)=>{
    try{
        destroyCookie(res)
        res.status(200).send()
    }
    catch(err){
        res.status(500).send(err)
    }
    
})

// router.get('/users/all', async (req, res)=>{
//     const results = await User.find({});
//     try {
//         console.log(results);
//         res.send(results)
//     }
//     catch (err) { res.status(500).send(err)}
// });

module.exports = router;
