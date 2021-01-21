const express = require('express');
const app = express();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const subjectRoutes=require('./api/routes/subjects');
const teacherRoutes=require('./api/routes/teachers');
const userRoutes = require('./api/routes/user');
const staffRoutes=require('./api/routes/staffs');
const studentRoutes= require('./api/routes/students');
const paymentRoutes= require('./api/routes/payments');
const classRoutes= require('./api/routes/classes');
const attendanceRoutes= require('./api/routes/attendances');

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", 'PUT, PATCH, POST, GET, DELETE');
        return res.status(200).json({});
    }
    next();
});

mongoose.connect('mongodb://127.0.0.1:27017/productdb',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
console.log('Successfully connected to MongoDB!');
})
.catch((error) => {
console.log('Unable to connect to MongoDB!');
console.error(error);
});

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.use('/subjects',subjectRoutes);
app.use('/teachers',teacherRoutes);
app.use('/user',userRoutes);
app.use('/staffs',staffRoutes);
app.use('/students',studentRoutes);
app.use('/payments',paymentRoutes);
app.use('/classes',classRoutes);
app.use('/attendances',attendanceRoutes);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status= 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});


module.exports=app;