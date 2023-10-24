const router = require('express').Router();
const withAuth = require("../utils/auth");
// TODO: 'Collection' in place of project
const { User, Collection, Wishlist } = require('../models');

router.get('/', (req, res) => {
  try {
    res.render('homepage', {
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

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

router.get('/catalogue', withAuth, (req, res) => {
  let log = false
  if (req.session.logged_in) {
    log = true
  }
  res.render('catalogue', {
    logged_in: log
  });
  
});

// UPDATE THIS TO SHOW EACH USERS COLLECTION INSTEAD OF ALL COLLECTIONS
router.get('/collection', withAuth, async (req, res) => {
  try {
    const collectionData = await Collection.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const collection = collectionData.map((collection) => collection.get({ plain: true }));
    let log = false
    if (req.session.logged_in) {
      log = true
    }

    res.render('collection', {
      collection,
      logged_in: log,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.get('/wishlist', withAuth, async (req, res) => {
  try {
    const wishlistData = await Wishlist.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const wishlist = wishlistData.map((wishlist) => wishlist.get({ plain: true }));
    let log = false
    if (req.session.logged_in) {
      log = true
    }
    //   const userData = await User.findOne({
    //     where: {
    //         userId: req.session.userId,
    //     }
    // })
    // console.log(userData, "TEST MESSAGE")
    // const info = userData.map((user) => user.get({ plain: true }))
    res.render('wishlist', {
      wishlist,
      logged_in: log
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

module.exports = router;
