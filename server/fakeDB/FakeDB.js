/*
kita buaat fakke db agar bisa cepat delete create dari database tanpa buat manual 
alat bantu agar lebih cpt dalam kerja

*/
//data
const rentals = require('./data/rentals');
//db
const Rental = require('../models/rental');

class FakeDB {
  //kita pakai async await mandatory biar aman
  clean() {
    return Rental.deleteMany({});
  }

  addData() {
    return Rental.create(rentals);
  }

  //populate
  async populate() {
    await this.clean();
    await this.addData();
  }
}

module.exports = FakeDB;
