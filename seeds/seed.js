const sequelize = require('../config/connection');
const { Labels, Sets, Wishlist } = require('../models');

const labelData = require('./labelData.json');
const setData = require('./setData.json');
const wishlistData = require('./wishlistData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Labels.bulkCreate(labelData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {
    await Project.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();