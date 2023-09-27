const User = require('./User');
const Collection = require('./Collection');
const Labels = require('./Labels');
const Sets = require('./Sets');
const Wishlist = require('./Wishlist');

User.hasMany(Collection, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

Labels.hasMany(Sets, {
    onDelete: 'CASCADE',
});

Sets.belongsTo(Labels, {
    foreignKey: 'label_id',
});

Wishlist.hasMany(Labels, {
    foreignKey: 'label_id',
    onDelete: 'CASCADE',
});

Wishlist.hasMany(Sets, {
    foreignKey: 'set_id',
    onDelete: 'CASCADE',
});

module.exports = { Labels, Sets, Wishlist, User, Collection };