const { request } = require('express');
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// Creating Application server
const app = express();

//Middleware
app.use(morgan('dev')); // Return in cl HTTP req header

app.use(express.json()); // Get the body of request

//// Creating Our Own Middleware ////
app.use((req, res, netx) => {
  console.log('Hello from middleware ✨');
  netx(); // Must call
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

////  Creating and Mounting Multiple Routers ////
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
