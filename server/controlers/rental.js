const mongoose = require('mongoose');
//kita ngambil dari databse
//nanti kita perbaiki codenya sprti brad traversy asyc await

const Rental = require('../models/rental');

//get Rental
exports.getAllRental = (req, res) => {
  //kalang atas ada req,res yg nnti kasih hasil
  //kalang bawah adalah dimana pncarian database
  const resultData = Rental.find({}, function (err, resultData) {
    if (err) {
      return Rental.sendError(res, {
        //sendError  func/sttic metod  yg kita buat
        //diental schame otomatis bisa dipanggil
        status: 422, //kita pasing no status
        detail: 'cant retrieve all data Rentals', //kit apasing detail
      });
    }
    return res.send(resultData);
  });
};

//getRentalById
exports.getRentalById = (req, res) => {
  //findById(id) is almost* equivalent to findOne({ _id: id })
  const { rentalId } = req.params;
  Rental.findOne({ _id: rentalId }, (err, resultData) => {
    if (err) {
      return Rental.sendError(res, {
        status: 422,
        detail: 'cant retrieve rental data',
      });
    }
    return res.json(resultData);
  });
};

exports.createRental = (req, res) => {
  const rentalData = req.body;

  //***ini create dari mongoose***
  // Rental.create(rentalData, (err, createdRental) => {
  //   if (err) {
  //     return res.status(422).send({
  //       errors: [{ title: 'rental Eroror', message: 'Cant Post Rental Data' }],
  //     });
  //   }
  //   return res.json({
  //     message: `Rental with id : ${createdRental._id} was added`,
  //   });
  // });
  ///***Create Dari model ***////
};

//catatan:createdRental: Rental.create(req.body,( jikaError,jikaSuscessresulTercreate)=> {
//req.body diwakili oleh variable rentalData,jikaError maka kasih res.status(422)
//jika success :masukan variable jikaSuscessresulTercreate sbgai response json

// exports.createRental = (req, res) => {
//   const rentalData = req.body;

//   //ada 2 cara add database dari create dan dari new Rental(rentalData) yg ini pada saat save taruh error
//   // taruh error trapingnya Rental.save(error=> {..dst});
//   Rental.create(rentalData, (err, success) => {
//     if (err) {
//       // return res.status(422).send({
//       //   error: [
//       //     { title: 'Rental Error' },
//       //     { message: 'cant Post New RentData' },
//       //   ],
//       // });
//       return Rental.sendError(res, {
//         status: 422,
//         detail: 'cant create rental data',
//       });
//     }
//     return res.send({
//       message: `new rental data wuth id:${rentalData._id} created successfully`,
//     });
//   });
//   Rental.save();
// };
//kalau yg sblumnya tampa database maka cari berdasarkan indexnya
//nah skrg cari didatabase berdasarkan idmya
exports.updateRental = (req, res) => {
  const { Id } = req.params;
  const newRental = req.body;
  Rental.findByIdAndUpdate(Id, (err, resulData) => {
    if (err) {
      // return res.status(422).send({
      //   err: [{ title: 'Rental Erro' }, { msg: 'cant update Rental Data' }],
      // });
      return Rental.sendError(res, {
        status: 422,
        detail: 'cant updated rental data',
      });
    }
  });
};

////////////////////catatan ///////////////////

/*
semua error handler res.status(422) karena sama kita pindahkan di modles/rental.js


*/

/* INI CATATAN KETIKA RENTAL masih blum di masukan database datanya 
masih di tarun di file data.js
// 
//karn sudha pake model maka ini kita marking 
//jadi kita ambil data rentals dari daabase
//const rentals = [
//   {
//     _id: 'a121',
//     city: 'pontianak',
//     title: 'comfort place to culinary buisennes',
//   },
//   {
//     _id: 'a122',
//     city: 'sanur',
//     title: 'comfort place to finding beuty beach-BALI',
//   },
//   {
//     _id: 'a123',
//     city: 'sembalun',
//     title: 'comfort place to seing forest and farm-NTB',
//   },
// ];

//get All
exports.getAllRental = (req, res) => {
  return res.json(rentals);
};
//get byId

exports.getRentalById = (req, res) => {
  const { rentalId } = req.params;
  const rentalById = rentals.find((r) => r._id === rentalId);
  return res.json({
    msg: rentalById,
  });
};
// add Rental
exports.addRental = (req, res) => {
  const newRental = req.body;

  rentals.push(newRental);
  console.log(newRental);
  return res.json({
    msg: `added new rendal with id :${newRental._id} successfully`,
  });
};

//delete rental cari index dari id dan delete
exports.deleteRental = (req, res) => {
  const { Id } = req.params;
  //pakai findindex
  const idx = rentals.findIndex((r) => r._id === Id);
  console.log('ini Idx =', idx);
  rentals.splice(idx, 1);
  return res.json({
    msg: `rentalId :${Id} has been deleted successfully`,
  });
};

//pacth rental ~ update
exports.updateRental = (req, res) => {
  const { Id } = req.params;
  const newUpdateRental = req.body;
  const idx = rentals.findIndex((r) => r._id === Id);
  rentals[idx].city = newUpdateRental.city;
  rentals[idx].title = newUpdateRental.title;
  return res.json({ msg: `rentalId :${Id} has been updated succesfully` });
};




*/
