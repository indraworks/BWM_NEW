//buat userSchema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    maxlength: [32, 'please max char 32'],
    minlength: [4, 'please min 4 chars'],
  },
  email: {
    type: String,
    maxlength: [32, 'please max char 32'],
    minlenght: [4, 'please min 4 chars'],
    unique: true,
    required: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ],
  },
  password: {
    type: String,
    maxlength: [32, 'pleasea max chars 32'],
    minlength: [4, 'please min 4 chars'],
    required: true,
  },
});

//pre-save password

module.exports = mongoose.model('User', userSchema);

// buat methode presave
userSchema.pre('save', (next) => {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, successHash) => {
      user.password = successHash;
      next();
    });
  });
});

//buat metode compare password
userSchema.methods.hasSamePassword(providedPassword) {
  return bcrypt.compareSync(providedPassword,this.password)
}//providedPasswrod yg diktik user dari req.body, yg this.pasword yg dari db User

//catatan:

/* methode pre-save utk controler register
//catatan UTK controler register ,kita buat metode di schema yaitu pre-save:
kita juga akan menbuat methods pre save yaitu sblum data user yg reguster di save didatanase maka
perlu di crypt paswordnya utk itu maka dilakukan dgn fungsi presave
kmudian kita pilih this.password  oya kita masukan variabel user sbgai pengganti this

*/


/*method hasSamePassword utk coroler Login :
disini kita buat methodd ini utk compare password text yg dimasukan dari req.body
dgn passwod yg sblumnya waktu register di crypt di datatabse
return comparenya pakai bcrypt jika sama hasil = true




*/