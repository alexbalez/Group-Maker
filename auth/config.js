//configuration settings for the application

//define a secret key for our JSON Web Token
//todo: this config file should not be stored on any public repository
//  because it is used as the key for our jwts!
module.exports = {
    'secret': 'supersecret'
};
