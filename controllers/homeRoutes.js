const router = require('express').Router();
// TODO: 'Collection' in place of project
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  try {
  
    // Get all Collection and JOIN with user data
    // const collectionData = await Collection.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //   ],
    // });

    // Serialize data so the template can read it
    // const collection = collectionData.map((collection) => collection.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/collection/:id', async (req, res) => {
//   try {
//     const collectionData = await Collection.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const collection = collectionData.get({ plain: true });

//     res.render('collection', {
//       ...collection,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // TODO: Fix the data request to get data from the DB in the proper format
    // Find the logged in user based on the session ID
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    //   include: [{ model: Project }],
    // });

    // const user = userData.get({ plain: true });

    res.render('profile', {
      // ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/catalogue', (req, res) => {
  res.render('catalogue');
});

module.exports = router;
