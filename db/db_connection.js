/**Loading Mongoose **/
const mongoose = require('mongoose');

/**Build Data Base connection String **/
const db_url = 'mongodb+srv://mahatokalyan2:apu101@cluster0.mrevbx6.mongodb.net/FoodRestro';

/**lets connect mongodb data base **/
const con = mongoose.connect(db_url)
       .then(() => {
              console.log('Mongodb data Base connected');
       })
       .catch((error) => {
              console.log(error);
       });


module.exports = con;
console.log('Data connection string is ready to use');      