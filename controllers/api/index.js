const router = require('express').Router();
const userRoutes = require('./userRoutes');
// TODO: name of routes to add -- wish list? And make js file for it in api folder
const collectionRoutes = require('./Routes');

router.use('/users', userRoutes);
// TODO: router.use for js file that we still need to name
router.use('/collections', collectionRoutes);

module.exports = router;
