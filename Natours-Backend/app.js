const fs = require('fs');
const { request } = require('express');
const express = require('express');

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

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
