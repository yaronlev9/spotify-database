const { Router } = require('express');

const router = Router();


router.get('/', (req, res) => {
    res.send('Hello World!')
  })
router.use('/songs', require('./song'));
router.use('/albums', require('./album'));
router.use('/artists', require('./artist'));
router.use('/playlists', require('./playlist'));
module.exports = router;