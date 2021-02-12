const jwt = require('jsonwebtoken');
const config = require('./config')

const requireAuth = (req, res, next) => {
    const token = req.cookies.gmUserCookie;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, config.secret, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(401).json({error: err})
            } else {
                console.log(decodedToken);
                req.id = decodedToken.id
                next();
            }
        });
    }
     else {
        res.status(401).json({error: "No token present"});
    }
};

module.exports = { requireAuth };