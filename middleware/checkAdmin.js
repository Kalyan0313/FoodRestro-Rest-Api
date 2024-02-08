/***User  Admin  or not **/

const jwt = require('jsonwebtoken');
const checkAdmin = ((req, res, next) => {
       try {
              var decoded = jwt.verify(req.headers.token, 'mySecret');
              //console.log(decoded.isAdmin);
              //console.log(req.headers.token);
              //return decoded.isAdmin;
              if (decoded.isAdmin) {
                     //if user is admnin then targeted route will bevisited
                     next();
              } else {
                     return res.status(400).json({ messaage: 'Only Admin has priviledge to access this operations....' });
                     
              }
          } catch(err) {
              // err
              return res.status(400).json({ messaage:err });
     }
     
});

module.exports =checkAdmin;
console.log(' check  user addmin or not Middleware is ready to use');