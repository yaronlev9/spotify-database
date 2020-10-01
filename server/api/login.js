const { Router } = require('express');
let jwt = require('jsonwebtoken');

const { User } = require('../models');

const router = Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username,
      password
    }
  });
  if(!user) {
    return res.status(500).json({
      errorMessage: 'wrong login details'
    })
  }
  let token = jwt.sign({username: username},
    process.env.JWT_SECRET,
    { expiresIn: '1h' // expires in 1 hours
    }
  );
    return res.json({
    success: true,
    token,
  });
});


module.exports = router;