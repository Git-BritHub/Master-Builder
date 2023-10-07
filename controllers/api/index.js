const router = require('express').Router();
const userRoutes = require('./userRoutes');
const collectionRoutes = require("./collectionRoutes");
const wishlistRoutes = require("./wishlistRoutes");

router.use('/users', userRoutes);
router.use('/collection', collectionRoutes);
router.use('/wishlist', wishlistRoutes);

module.exports = router;
