 /***User  have token or not **/
 const jwt = require('jsonwebtoken');

 const checkUser = ((req, res, next) => {
          try {
                 var decoded = jwt.verify(req.headers.token, 'mySecret');
                 console.log(decoded);
             } catch(err) {
                 // err
                 res.status(400).json({ messaage: 'Token Backlisted....' });
        }
        next();
 });
 
 module.exports = checkUser;
 console.log('User check Middleware is ready to use');