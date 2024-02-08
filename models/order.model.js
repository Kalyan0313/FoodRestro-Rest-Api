/** Loading Mongoose **/
const mongoose = require('mongoose');

/**Lets define user schema **/
const OrderSchema = mongoose.Schema({
       oderDate: {
              type: Date,
              default: Date.now()    
       },
       user: {
              type:mongoose.Schema.Types.ObjectId,
              required: true,
              ref:'userModel'
             
       },
       food: {
              type: mongoose.Schema.Types.ObjectId,
              require: true,
              ref:'foodModel'
       }
       
     
},{versionKey:false});

/**Define order Model **/        //virtualname orderSchema   orderTable
const orderModel = mongoose.model('orderModel',OrderSchema, 'ordersInfo');
module.exports =orderModel;
console.log('Order Model is ready to use');