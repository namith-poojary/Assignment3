const express=require("express");

const mongoose=require("mongoose");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app=express();

mongoose.connect("mongodb+srv://api_test:api_test@cluster0.rcj7wxp.mongodb.net/myDatabase?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api', userRoutes);

app.listen(3000,()=>{
    console.log("server up and running");
});

module.exports = app;