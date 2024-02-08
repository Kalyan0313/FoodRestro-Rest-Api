/**Loading Express**/
const express = require('express');
/**Make  a express router service**/
const Route = express.Router();
const foodModel = require('../models/food.model');
const { Mongoose } = require('mongoose');

/**Consume  file upload obj **/
const uploadObj = require('../file_upload/upload');

/**Base uploadUrl **/
const uploadUrl = require('../base_url/base_url');

/**Consume  checkAdmin and checkUser**/
const checkAdmin=require('../middleware/checkAdmin');
const checkUser=require('../middleware/checkUser');

/** ALL FOOD RELATED API END POINTS**/


/**Geting all food Items**/
Route.get('/getAllfoods',(req, res) => {
       /**Now using Mongoose model to get all
        * the data from data base
        * ORM Technique
        * **/
       let allFoods = foodModel.find({});
       allFoods.then((foodInfo) => {
              //console.log(foodInfo);
              res.status(200).json({
                     'status': 'success',
                     'info':foodInfo
              })
       }).catch((error) => {
              //console.log(error);
              res.status(400).json({
                     'status': false,
                     'error':error
              })
            })          
                               
});

/**Geting Particular food Item**/
Route.get('/getFoodByID/:id', (req, res) => {
       let foodById = foodModel.findById({ _id: req.params.id });
       foodById.then((foodByIDInfo) => {
              //console.log(foodByIDInfo);
              if (foodByIDInfo != null) {
                     res.status(200).json({
                            'status': 'success',
                            'info': foodByIDInfo
                     });
              }
              else {
                     res.status(400).json({
                            'status':false,
                            'message':'food Item not found...!'   
                     }) 
              }
           
              })
              .catch((error) => {
                     res.status(400).json({
                            'status':false,
                            'error': error.message,
                           
                    })    
               })
});


/***AddNew Food Items **/

Route.post('/addFood',uploadObj.single('food_image'),(req, res) => { 
       

       let newfood = new foodModel({
              food_name: req.body.food_name,
              food_desc: req.body.food_desc,
              food_price: req.body.food_price,
              food_image:`${uploadUrl}${req.file.filename}`
              
       })
       // console.log(req.file);
       // res.status(200).json({ info: newfood });
       /**Add foood Into datbase**/
      let info=newfood.save()
       info.then((result) => {
              // console.log(result);
              if (result) {
                     res.status(200).json({ success: true, message: 'One item added successfull' });
              }
       })
              .catch((error) => {
                     //console.log(error);
                     res.status(400).json({ success: false, err: error });
              });

});

/**Delete Food Item**/
//const fs = require('fs');
Route.delete('/deleteFoodByID/:id', (req, res) => {
       
       // let getFile = foodModel.findById({ _id: req.params.id }).then((result) => {
       //        console.log(result); 
       //        let OldimagePath = result.food_image;
       //        console.log(OldimagePath.length);
       //        let cutPath = OldimagePath.slice(30);
       //        console.log(cutPath);
       //        let findFile = fs.readdirSync('public/uploads');
       //        console.log(findFile);
       //        let data = findFile.filter((file) => {
       //               return file.includes(cutPath);  
       //        })
       //        console.log(data[0]);
       //       if (data.length) {
       //              // fs.unlink(`/public/uploads/${data[0]}`);     
                
       //       fs.unlink(`./public/uploads/${data[0]}`,function(err){
       //       if(err) return console.log(err);
       //       console.log('file deleted successfully');
       //       });      
       //        }

             

       // }).catch((err) => {
       //        console.log(err);
       // })
       
       // console.log(OldimagePath);
      

       let delfood = foodModel.findOneAndDelete({ _id: req.params.id });
       delfood.then((result) => {
              //res.status(200).json(result);
              res.status(200).json({ success: true, message: 'One item deleted....!' });
       })
              .catch((error) => {
                     //res.status(400).json(error);
                     res.status(400).json({ success: false, message: 'something went wrong...!' });
              });
});

/**---Update Food Items---**/

Route.all('/updateFoodByID/:id', uploadObj.single('food_image'), (req, res) => { 
       
       if (req.method == 'PUT' || req.method == 'PATCH') {
               
            

       
              /**Update code **/
               let updateInfo = foodModel.findOneAndUpdate({ _id: req.params.id }, {
                     $set: {
                            food_name: req.body.food_name,
                            food_desc: req.body.food_desc,
                            food_price: req.body.food_price,
                            food_image:`${uploadUrl}${req.file.filename}`

                     }
              }).exec()
                     updateInfo.then((result) => {
                            // res.status(200).json(result);
                             console.log(result);
                            if (result) {
                                   res.status(200).json({ success: true, message: 'One item updated' });
                            }
                            else {
                                   res.status(200).json({ success: false, messag: 'food item not found...!' });  
                            }
                     })
                     .catch((error) => {
                           res.status(400).json({success:false,message:error})   
                      })




       } else {
             res.status(400).json({message:`${req.method} does't support try correct method`})   
       }
});








module.exports = Route;
console.log('Food Route is ready to use');