// const Student = require('../model/Student');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
//
// const register = (userData, next) => {
//     bcrypt.hash(userData.password, 10, (err, hashedPassword) => {
//         if(err){
//             console.log(err);
//             return err;
//         }
//
//         let user = new Student({
//             name: userData.name,
//             email: userData.email,
//             password: hashedPassword,
//             semester: userData.semester
//         });
//
//         user.save()
//             .then((user) => {
//                 // TODO res to return user
//                 return 200;
//             })
//             .catch((err) => {
//                 // TODO res to return err
//                 return err;
//             });
//     });
// };
//
// module.exports.register = (userData, next) => {
//     register(userData, next);
// };
