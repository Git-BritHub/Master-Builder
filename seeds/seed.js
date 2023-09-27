const sequelize = require('../config/connection');
const { Labels, Sets, Wishlist, User } = require('../models');

const labelData = require('./labelData.json');
const setData = require('./setData.json');
const wishlistData = require('./wishlistData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const labels = await Labels.bulkCreate(labelData, {
    individualHooks: true,
    returning: true,
  });

  const sets = await Sets.bulkCreate(setData, {
    individualHooks: true,
    returning: true,
  });

  const wishlist = await Wishlist.bulkCreate(wishlistData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();