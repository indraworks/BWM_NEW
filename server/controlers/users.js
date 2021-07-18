const { restart } = require('nodemon');
const User = require('../models/users');


//login
exports.login = (req, res) => {
  const {email,password} = req.body;
  //validation
  if(!password || !email) {
    return res.status(422).send({errors:[ 
      {title:"missing data"},
      {detail:"required email|| password"}
    ]})
  }
  //cari emailnya ada pa gak
  User.findOne({email},(err,successFoundUser)=> {
    if(err) {
      return res
        .status(422)
        .send({
          errors: [
            { title: 'DB Error' },
            { detail: 'something wrong with server error' },
          ],
        });
    }
   if(!successFoundUser) {
     return res.status(422).send({
       errors:[{title:"Invalid Email"},{detail:"Email Not Exist,please register"}]
     })
   }
   if(successFoundUser.hash) {

   }

  })

};



//register
exports.register = (req, res) => {
  const { username, email, password, passwordConfirm } = req.body;
  //validation
  if (!password || !email) {
    return res
      .status(422)
      .send({
        errors: [
          { title: 'missing data' },
          { detail: 'email || password is missing' },
        ],
      });
  }
  if (password !== passwordConfirm) {
    return res
      .status(422)
      .send({
        errors: [
          { title: 'invalid passwod' },
          { detail: 'passwod shoud macth with confirm Password' },
        ],
      });
  }
  //check existing email
  User.findOne({ email }, (err, userExist) => {
    if (err) {
      return res.status(422).send({
        errors: [
          { title: ' DB Error' },
          { detail: 'opps something wrong with db' },
        ],
      });
    }
    if (userExist) {
      return res.status(422).send({
        errors: [
          { title: 'invalid email' },
          { detail: 'email user exist please login' },
        ],
      });
    }
  });
  //create new User
  const user = new User({ username, email, password });
  //save
  user.save((error) => {
    if (error) {
      return res.status(422).send({
        errors: [
          { title: 'DB error' },
          { detail: 'oops somethign wrong with server' },
        ],
      });
    }
  });
  //response for success
  return res.json({ status: 'registered' });
};

/*
 create login,register controler 
 buat route masing2 controler


*/
