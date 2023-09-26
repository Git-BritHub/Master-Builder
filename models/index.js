const User = require('./User');
const Collection = require('./Collection');

User.hasMany(Collection, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Collection };