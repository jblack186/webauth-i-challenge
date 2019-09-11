
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model.js');


module.exports = (req, res, next) => {
    // AS LONG AS SOMEONE HAS A SUSERNAME AND PASSWORD THAT HAS BEEN VALIDATED THEY SHOULD HAVE ACCESS
    // USERNAME AND PASSWORD SHOULD NOT BE IN HEADERS - GRAB COOKIE INSTEAD
    //this if statement checks if there is a session and is there a user info on the session that is validated
console.log('req session', req.session)
     if (req.session && req.session.user) {
         next();  
              }
        else {
         res.status(401).json({ message: 'Invalid Credentials'})
            }
};
    // YOU DONT NEED TO QUERY THE DATABASE
//     let { username, password } = req.headers;
//     if(username && password){
//     Users.findBy({ username })
//     .first()
//     .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//             next();
       
//         }
//         else {
//             res.status(401).json({ message: 'Invalid Credentials'})
//         }
//     })
//     .catch(error => {
//         console.log(error)
//         res.status(500).json(error);
//     })
//    } else {
//        res.status(400).json({ message: 'please provide valid info'})
//    }
