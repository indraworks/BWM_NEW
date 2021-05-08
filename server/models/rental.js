const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: [128, 'invalid length!maximum 128 char'],
  },
  city: { type: String, required: true, lowercase: true },
  street: {
    type: String,
    lowercase: true,
    required: true,
    minLength: [4, 'invalid min 4 char'],
  },
  category: { type: String, required: true, lowercase: true },
  image: { type: String, required: true },
  numOfRooms: { type: Number, required: true },
  description: { type: String, required: true },
  dailyPrice: { type: Number, required: true },
  shared: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
});

//kita pakai statucs metodnya karena ada di coletion
//kalau metode dia diakses dalam document
//lebih lengkapnya :
//https://stackoverflow.com/questions/29664499/mongoose-static-methods-vs-instance-methods#:~:text=statics%20are%20the%20methods%20defined,on%20the%20document%20(instance).&text=But%20you%20wouldn't%20do,it%20has%20no%20%22type%22.
//https://stackoverflow.com/questions/23425303/what-is-the-difference-between-methods-and-statics-in-mongoose

//config terdiir atas status dan detail
//kit apakai statics gak bisa pakai methodes karena lintas module!
rentalSchema.statics.sendError = function (res, config) {
  return res
    .status(config.status)
    .send({ errors: [{ title: 'Rental Error' }, { config: config.detail }] });
};

// rentalSchema.statics.sendError = function(res,config) {
//   const {status,detail} = config;
//   return res.status(status)
//   .send({errors:[{title:'Rental Error!'},detail]})

// }

module.exports = mongoose.model('Rental', rentalSchema);

/*
jadi gini kan kalau tetulus modelnya "Rental" maka pas kita create 
secara langsung lewat postnan dlm artian db kosong maka nama databasae akan ikut nama dari 
script yg ada di config/dev.js yg ada di DB-URI =.....dst//BWM_NEW?retryWrites=true&w=majority'
dalam hal ini trcreate DB name = "BWM_NEW"
nah nanti nama collectionya otomatis menjadi rentals yg merupkan plural dari Rental ( pakai hhuruf kecil semua)
*/

/*
ingat utk buat valiadation di mongopake cara
{judul:[angka max/min,'kata2 peringatannya ']
  },

ukt export harus dibuatkan nama modelnya sehingga itu nanti yg dipakai 
sebgai nama model dlm hal ini namnaya 'Rental' ,yg struturenya berasal dari RentalSchema
module.exports = mongoose.model('Rental',rentalSchema)
nah ini nnati di pakai di index.js
*/
