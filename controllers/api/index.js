const router = require('express').Router();
const userRoutes = require('./userRoutes');
const collectionRoutes = require("./collectionRoutes")

// TODO: name of routes to add -- wish list? And make js file for it in api folder

router.use('/users', userRoutes);
router.use('/collection', collectionRoutes)

// TODO: router.use for js file that we still need to name

module.exports = router;
