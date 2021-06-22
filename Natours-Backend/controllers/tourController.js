const Tour = require('../models/tourModel');

//// Route Handlers ////

exports.getAllTours = async (req, res) => {
  try {
    //// Making the API Better: Filtering ////
    // BUILD QUERY

    // 1A) Filtering
    const queryObj = { ...req.query }; // Creating new object
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    ); // \b = exactly words g = multiple times
    console.log(JSON.parse(queryString));
    let query = Tour.find(JSON.parse(queryString));

    // 2) Sorting //// Making the API Better: Sorting ////
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query = query.sort(sortBy);
      // sort('price ratingsAverage') moongose depper sort
    } else {
      query = query.sort('-createdAt');
    }

    // Mongo DB {difficulty: 'easy', duration: {$gte: 5}}
    // { difficulty: 'easy', sort: '1', limit: '10', duration: { gte: '5' } }
    // gte, gt, lte, lt

    // EXECUTE QUERY

    const tours = await Tour.find(query);

    // const tours =  Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({_id: req.params.id})

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    //// Another Way of Creating Documents ////
    // const newTour = new Tour({})
    // newTour.save() ⬇ Easier way
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      // 201 => created
      status: 'sucess',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'sucess',
      data: { tour },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'sucess',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};
