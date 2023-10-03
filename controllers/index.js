const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./homeRoutes.js');
const profileRoutes = require("./profileRoutes.js")

router.use('/', homeRoutes);
router.use("/profile", profileRoutes);
router.use('/api', apiRoutes);

module.exports = router;
