/**Laod express**/
const express = require('express');

/**Create a Instance of a Route Express**/
const Route = express.Router();

/**Consume Order Model**/
const orderModel = require('../models/order.model');


/**--------------------ALL ORDER RELATED ROUTE---------------**/

/**Add new Order  **/
Route.post('/placedOrder', (req, res) => {
       // res.status(200).send('order route');
       let newOrder = new orderModel({
              user: req.body.userID,
              food: req.body.foodID
       });
       let saveOder = newOrder.save();
       saveOder.then((result) => {
              //res.status(200).json({ info: result });
              res.status(200).json({ status: 'success', message: 'Oder successfuly placed......!' ,oderInfo:result});
       })
              .catch((error) => {
                     res.status(200).json({ msg: error });
      });
       

});


/**View Order Info ***/
Route.get('/viewOrder/:id',async (req, res) => {
       let findOrderInfo = await orderModel.find({ _id: req.params.id }).populate('user').populate('food');
       if (!findOrderInfo.length) {
               res.status(200).json({success:false,message:'Something went wrong...!'})    
       } else {
              //res.status(200).json(findOrderInfo);
              let ORDER = [];
              findOrderInfo.forEach((item) => {
                     let order = {
                            date:item.oderDate,
                            name:item.user.name,
                            food:item.food.food_name,         
                     }  
                     ORDER.push(order);  
              })
              res.status(200).json(ORDER);
              
            }
       
});


/**Order Route Export**/
module.exports = Route;
console.log('Order Router service is ready to use');