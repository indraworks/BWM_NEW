const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  title: { type: String, maxlength: [128, 'invalid length!maximum 128 char'] },
  city: { type: String, lowercase: true },
  street: {
    type: String,
    lowercase: true,
    minLength: [4, 'invalid min 4 char'],
  },
  category: { type: String, lowercase: true },
  image: { type: String },
  numOfRooms: { type: Number },
  description: { type: String },
  dailyPrice: { type: Number },
  shared: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
});

//skarang kita mau buat sendError jika ada respons status yg gagal
//yg dikluarkan oleh controler/route rentals ini
//nama funct adalah sendError dan kita buat declare dgn anomius func
//nameSchema.static.nameFunc = ()=> {} // ()=>{} //ini anomiusy func
//stlah kita buat func sendError ini modelschema rental utk errornya
//maka kita impplement di controler/rentals

rentalSchema.statics.sendError = (res, config) => {
  const { status, detail } = config;
  return res
    .status(status)
    .send({ errors: [{ title: 'Rental Error!', detail }] });
};
//ingat error brupa [] array karna bnyak erorr masuk di array
module.exports = mongoose.model('Rental', rentalSchema);

///*** CATATAN KITA BISA BUAT METHODS DAN STATIC  DI MODEL SCHEMA KITA */
//kita pakai statics metodnya karena ada di coletion
//kalau metode dia diakses dalam document
//lebih lengkapnya :
//https://stackoverflow.com/questions/29664499/mongoose-static-methods-vs-instance-methods#:~:text=statics%20are%20the%20methods%20defined,on%20the%20document%20(instance).&text=But%20you%20wouldn't%20do,it%20has%20no%20%22type%22.
//https://stackoverflow.com/questions/23425303/what-is-the-difference-between-methods-and-statics-in-mongoose

/* Static:
https://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
contoh static langsung bisa buat function :
Statics
Statics are pretty much the same as methods 
but allow for defining functions that exist directly on your Model.

AnimalSchema.statics.search = function search (name, cb) { //langusung buat func
  return this.where('name', new RegExp(name, 'i')).exec(cb);
}
//dan langsung func search tadi di populate atau di panggil
//dicolection atau di lain module:

Animal.search('Rover', function (err) {
  if (err) ...
})
*/

//config terdiir atas status dan detail
//kita apakai statics gak bisa pakai methodes karena lintas module!
// rentalSchema.statics.sendError = function (res, config) {
//   return res
//     .status(config.status)
//     .send({ errors: [{ title: 'Rental Error' }, { config: config.detail }] });
// };

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
