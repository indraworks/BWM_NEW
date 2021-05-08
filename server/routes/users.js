const express = require('express');
const router = express.Router();
const User = require('../models/users');


router.get('/', (req, res) => {
  return res.json({
    msg: 'all user ok',
  });
});

//posts signin
router.post('/login',(req,res)=> {
   return res.send('this is response that you are log in ')
})

//posts register
router.post('/register',(req,res)=> {
  return res.send('this response that you are registering')
})

module.exports = router;
