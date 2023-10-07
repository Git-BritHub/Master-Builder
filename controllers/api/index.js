const router = require('express').Router();
const userRoutes = require('./userRoutes');
const collectionRoutes = require("./collectionRoutes");
const wishlistRoutes = require("./wishlistRoutes");

// TODO: name of routes to add -- wish list? And make js file for it in api folder

router.use('/users', userRoutes);
router.use('/collection', collectionRoutes);
router.use('/wishlist', wishlistRoutes);

// TODO: router.use for js file that we still need to name

module.exports = router;
