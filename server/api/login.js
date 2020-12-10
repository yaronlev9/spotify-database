const { Router } = require('express');
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const router = Router();
const saltRounds = 10;

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username: username,
    }
  });
  bcrypt.compare(password, user.password, function(err, resp) {
    if (resp){
      let token = jwt.sign({username: username},
        process.env.JWT_SECRET,
        { expiresIn: '1h' // expires in 1 hours
        }
      );
        return res.json({
        success: true,
        token,
      });
    }
    else {
      return res.status(500).json({
        errorMessage: 'wrong login details'
      })
    }
  });
});


module.exports = router;