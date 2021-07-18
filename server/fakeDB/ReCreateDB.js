const rentals = require('./data/rentals');
const Rental = require('../models/rental');

class ReCreateDB {
  cleanDB() {
    return Rental.deleteMany({});
  }

  createDB() {
    return Rental.create(rentals);
  }
  //tinggal kita populate,dgn buat func populate
  //ingt funvc/method dibuat didalam class
  async populate() {
    await this.cleanDB();
    await this.createDB();
  }
}

module.exports = ReCreateDB;
