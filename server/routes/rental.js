const express = require('express');
const router = express.Router();

const {
  getAllRental,
  getRentalById,
  createRental,
  // deleteRental,
  // updateRental,
} = require('../controlers/rental');

//get All
router.get('/', getAllRental);
//get byId

router.get('/:rentalId', getRentalById);

// // add Rental
router.post('/', createRental);

// //delete rental cari index dari id dan delete
// router.delete('/:Id', deleteRental);

// //pacth rental ~ update
//  router.patch('/:Id', updateRental);

module.exports = router;
