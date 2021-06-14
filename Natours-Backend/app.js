const fs = require('fs');
const { request } = require('express');
const express = require('express');

//Creating server
const app = express();

// Get the body of request
app.use(express.json());

// Data of tours
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//// Handling GET Requests ////
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

//// Responding to URL Parameters ////
app.get('/api/v1/tours/:id', (req, res) => {
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
});

//// Handling POST Requests ////
app.post('/api/v1/tours', (req, res) => {
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
});

//// Handling PATCH Requests ////
app.patch('/api/v1/tours/:id', (req, res) => {
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
});

//// Handling DELET Requests ////
app.delete('/api/v1/tours/:id', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
