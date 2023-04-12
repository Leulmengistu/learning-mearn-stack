const express = require('express'); // returns an object
const cors = require('cors');
const mongoose = require('mongoose');
const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users')

require('dotenv').config();

const app = express(); //creating the express server
const port = process.env.PORT || 5000;

//applying middlewares
app.use(express.json());
app.use(cors());

//connecting to mongoDB atlas
const uri = process.env.ATLAS_URI;

async function connect (){ 
    try{
        const connection = await mongoose.connect(uri, {useNewUrlParser: true})
        console.log("Connection created with mongoDB Atlas...")
    }catch(err){console.log(err)}
}

connect();

// setting up the routers for exercise and users.
app.use('/exercises', exerciseRouter);
app.use('/users',userRouter);



app.listen(port,()=>{console.log(`Server is running on port: ${port}`)})