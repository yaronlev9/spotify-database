const { Router } = require('express');
const checkToken = require('../middleware/auth');

const router = Router();

router.use('/login', require('./login'));

router.use('/artists', checkToken, require('./artist'));
router.use('/albums', checkToken, require('./album'));
router.use('/songs', checkToken, require('./song'));
router.use('/playlists', checkToken, require('./playlist'));
module.exports = router;