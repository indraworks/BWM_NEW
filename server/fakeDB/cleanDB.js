const mongoose = require('mongoose');
const config = require('../config/dev');
const FakeDB = require('./FakeDB');

mongoose.connect(
  config.DB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  },
  async () => {
    const fakeDB = new FakeDB();
    console.log('starting populatng DB');
    await fakeDB.populate(); //cleanup db dan create db yg baru /add
    await mongoose.connection.close(); //close kluar dari mongodb
    console.log('DB has been populate');
  }
);
