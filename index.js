const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('./server/config/dev');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;

//routes
const usersRoute = require('./server/routes/users')
const rentalRoute = require('./server/routes/rental');

//midleware
app.use(bodyParser.json());

//models //sbnarnya tanpa 
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
// api routes
app.use('/api/v1/rentals', rentalRoute);
app.use('/api/v1/users', usersRoute)

app.listen(PORT, () => {
  console.log(`server runing on the ${PORT}`);
});
