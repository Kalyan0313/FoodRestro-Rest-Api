/** Loading Mongoose**/
const mongoose = require('mongoose');


/**Create a Schema **/
const FoodSchema = mongoose.Schema({
       food_name:
       {
              type: String,
              required: true
       },
       food_desc: {
              type: String,
              required:true
       },
       food_price: {
              type: String,
              required:true
       },
       food_image: {
              type: String,
              required:true
       }
},{versionKey:false}); 

/**Now create a Model **/
/**
 *   'foodModel' : FoodModel vitual name 
 *   'FoodSchema' : It will define database schema 
 *   'foods' : Data base collection name.
 * 
 * **/
const foodModel = mongoose.model('foodModel', FoodSchema, 'foods');
module.exports = foodModel;
console.log('Food Model is ready to use');