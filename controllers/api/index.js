const router = require('express').Router();
const userRoutes = require('./userRoutes');
// TODO: name of route -- wish list? And make js file for it in api folder
// const projectRoutes = require('./projectRoutes');

router.use('/users', userRoutes);
// TODO: router.use for js file that we still need to name
// router.use('/projects', projectRoutes);

module.exports = router;
