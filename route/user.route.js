/**Laod express**/
const express = require('express');
/**Load bcrypt js**/
const bcryptjs = require('bcryptjs');

/**Lading Json webtoken**/
const jwt = require('jsonwebtoken');

/**Create a Instance of a Route Express**/
const Route = express.Router();

/**Consume user Model**/
const userModel = require('../models/user.model');



/**--------------------ALL USER RELATED ROUTE---------------**/

/**Getting all user Info **/
Route.get('/getAllusers', (req, res) => { 

});


/***Password Hash function **/
function PassHash(pass) {
       var salt = bcryptjs.genSaltSync(10);
       var hashPass = bcryptjs.hashSync(pass, salt);
       return hashPass;
}

/**Add New User **/

Route.post('/user/signup', (req, res) => { 
       //res.status(200).json({ msg: 'user route' });

       let newUser = new userModel({
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone,
              password:PassHash(req.body.password)
       })

       //res.status(200).json(newUser);
       /**Add User into the Data Base**/
       newUser.save()
              .then((result) => {
                     //res.status(200).json(result); 
                     res.status(200).json({ success: true, message: 'You have successfully register with us...!' });
              })
              .catch((error) => {
                     //res.status(400).json({ success: false, message: error }); 
                     if (error.keyPattern.email) {
                            res.status(400).json({ success: false, message: 'email already register with us Please try different email' });    
                     } else if(error.keyPattern.phone) {
                            res.status(400).json({ success: false, message: 'Phone already register with us Please try different phone' });  
                     } else {
                            res.status(400).json({sucess:false,message: error });       
                     }
              })
});


/***Check user HasPass **/
function CheckHashPass(UPass,DbPass) {
       let hashCheck = bcryptjs.compareSync(UPass, DbPass);
       return hashCheck;
}
/**User will available or not  use sinin **/
Route.post('/user/signin', (req, res) => { 
       let userInfo = userModel.findOne({ email: req.body.email })
       userInfo.then((result) => {
              if (!result) {
                     res.status(400).json({ success: false, message: 'User does not exist....! ' });
              }
              else {
                    
                     let isValid = CheckHashPass(req.body.password, result.password); 
                     // res.status(200).json({ info: result, valid:isValid});
                     if (isValid) {
                            /**generate Token / User auth key **/
                            // res.status(200).json({ success: true, message: 'token generate' });
                            //jwt.sign({ data: 'foobar'}, 'secret', { expiresIn: '1h' });
                            let Admin=false;
                            if(result.role=='admin')
                            {
                                   Admin=true;
                            }
                            let genToken = jwt.sign({ email: result.email, isAdmin:Admin }, 'mySecret', { expiresIn: '1h' });
                            res.status(200).json({ success: true, name: result.name, email: result.email, token: genToken });
                     } else {
                            res.status(400).json({ success: false, message: 'Wrong Creditials....!' });   
                     }
              }
               })
              .catch((error) => {
                     res.status(400).json(error);   
               })


});

/**User Route Export**/
module.exports = Route;
console.log('User Router service is ready to use');
