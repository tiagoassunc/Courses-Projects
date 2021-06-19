const fs = require('fs');

// Data of tours
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
// Route Handlers

//Param Middleware callback func - for previous check ID validation
exports.checkID = (req, res, next, value) => {
  console.log(`Tour is ${value}`);

  if (req.params.id * 1 > tours.length) {
    // Need to return to function stops and don't => next() = error more than 1 res
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
  next(); // To not stop Middleware
};

exports.checkBody = (req, res, next) => {
  if (!req.body.price || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Bad request: Missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
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

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    data: { tour: '<Update tour>' },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'sucess',
    data: null,
  });
};
