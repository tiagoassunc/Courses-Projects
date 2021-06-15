const fs = require('fs');
const { request } = require('express');
const express = require('express');
const morgan = require('morgan');

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

// Data of tours
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Route Handlers
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  // : to parameters or ? to optional parameters
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  // Creating new Object mergin
  const newTour = Object.assign({ id: newId }, req.body);

  // Pushing tour to tours array
  tours.push(newTour);

  // Overwite tours file
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        // 201 => created
        status: 'sucess',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }

  res.status(200).json({
    status: 'sucess',
    data: { tour: '<Update tour>' },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route is not yet define!',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route is not yet define!',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route is not yet define!',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route is not yet define!',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route is not yet define!',
  });
};

//// Handling GET Requests ////
// app.get('/api/v1/tours', getAllTours);
//// Handling POST Requests ////
// app.post('/api/v1/tours', createTour);

//// Responding to URL Parameters ////
// app.get('/api/v1/tours/:id', getTour);
//// Handling PATCH Requests ////
// app.patch('/api/v1/tours/:id', updateTour);
//// Handling DELET Requests ////
// app.delete('/api/v1/tours/:id', deleteTour);

////  Creating and Mounting Multiple Routers ////
// Routes
// Middleware for specific route (subapp)
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
