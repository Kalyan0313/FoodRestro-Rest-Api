/**Load Experess  */
const express = require('express');
/**Loading cors library**/
const cors = require('cors');

/** Define Port */
const port = 3000;
/**Consume data base connection string**/
const con = require('./db/db_connection');


/** Crate a Instance of express  */
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**For share static resourses**/
app.use(express.static('public'));


/**consume All route**/
const foodRoute = require('./route/food.route');
const userRoute = require('./route/user.route');
const orderRoute=require('./route/order.route');

/**Load all route path**/
app.use('/api/v1/', foodRoute);
app.use('/api/v1/', userRoute);
app.use('/api/v1/', orderRoute);


/** Create a Basic landing page**/
app.get('/', (req,res) => {
       res.send(`<h4 align="center">Welcome To FoodRestro-2024</h4>`);    
});


/*Binding port no*/
app.listen(port, () => { 
       console.log(`Server has started at localhost:${port}`);  
});