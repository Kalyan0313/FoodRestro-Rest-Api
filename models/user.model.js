/** Loading Mongoose **/
const mongoose = require('mongoose');

/**Lets define user schema **/
const userSchema = mongoose.Schema({
       name: {
              type: String,
             required:true    
       },
       email: {
              type: String,
              required: true,
              unique:true
       },
       phone: {
              type: String,
              required: true,
              unique:true
       },
       password: {
              type: String,
              required:true
       },
       role: {
              type: String,
              default: 'regular'
             
       }
      
},{versionKey:false});

/**Define User Model **/        //virtualname userSchema   userTable
const userModel = mongoose.model('userModel', userSchema, 'users');
module.exports = userModel;
console.log('User Model is ready to use');