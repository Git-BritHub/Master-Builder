const router = require('express').Router();
const userRoutes = require('./userRoutes');
// TODO: name of routes to add -- wish list? And make js file for it in api folder
const homeRoutes = require('./homeRoutes');

router.use('/usersRoutes', userRoutes);
// TODO: router.use for js file that we still need to name
router.use('/homeRoutes', homeRoutes);

module.exports = router;
