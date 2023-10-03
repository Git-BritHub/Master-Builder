const router = require('express').Router();
const { User } = require('../../models');

// Handles creation of an account and login once user selects submit
router.post('/', async (req, res) => {
  // console.log(req.body)
  try {
    const userData = await User.create({
        username: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.email = userData.email;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Handles login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username }
    });
    if (!userData) {
      res
        .status(400)
        //   TODO: come up with fun lego themed message for login failure
        .json({ message: 'Incorrect password, please try again' });
      return;
    }
    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        //   TODO: come up with fun lego themed message for login failure
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email = userData.email;
      req.session.logged_in = true;
      
    //   TODO: come up with fun lego themed message for login success
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Handles logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;