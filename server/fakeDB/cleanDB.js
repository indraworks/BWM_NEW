const mongoose = require('mongoose');
const config = require('../config/dev');
const ReCreateDB = require('./ReCreateDB');

mongoose.connect(
  config.DB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  },
  async () => {
    const recreateDB = new ReCreateDB(); //instansiate class
    console.log('Starting populate db');

    await recreateDB.populate(); //panggil methodenya
    await mongoose.connection.close();
    console.log('DB has been populate ');
  }
);
