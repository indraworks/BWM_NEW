const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('./server/config/dev');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const rentalRoute = require('./server/routes/rental');

//midleware
app.use(bodyParser.json());

//models
const Rental = require('./server/models/rental');
//db
mongoose.connect(
  config.DB_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  },
  () => {
    console.log('db connected');
  }
);
//routes
app.use('/api/v1/rentals', rentalRoute);

app.listen(PORT, () => {
  console.log(`server runing on the ${PORT}`);
});
