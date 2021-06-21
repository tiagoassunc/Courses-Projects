const express = require('express');
const tourController = require('../controllers/tourController');

// Middleware for specific route (subapp)
const router = express.Router();
// routes - (close Middleware to send the resp)

//// Param Middleware //// (for specifc routes parameters) -previous check ID validation
// router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour); // Chaining Multiple Middleware Functions

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
