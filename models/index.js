const User = require('./User');
const Collection = require('./Collection');
const Labels = require('./Labels');
const Sets = require('./Sets');
const Wishlist = require('./Wishlist');

User.hasOne(Collection, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasOne(Wishlist, {
  foreignKey: 'wishlist_id',
  onDelete: 'CASCADE',
});

Collection.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: 'CASCADE',
});

Wishlist.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Sets.belongsTo(User, {
  foreignKey: 'user_id',
});

Sets.belongsTo(Labels, {
  foreignKey: 'label_id',
});

Labels.belongsTo(User, {
  foreignKey: 'user_id',
});

Labels.hasMany(Sets, {
  foreignKey: 'set_id',
  onDelete: 'CASCADE',
});

// Wishlist.hasMany(Labels, {
//   foreignKey: 'label_id',
//   onDelete: 'CASCADE',
// });

// Wishlist.hasMany(Sets, {
//   foreignKey: 'set_id',
//   onDelete: 'CASCADE',
// });

User.hasMany(Sets, {
  foreignKey: 'set_id',
  onDelete: 'CASCADE',
});

User.hasMany(Labels, {
  foreignKey: 'label_id',
  onDelete: 'CASCADE',
});

module.exports = { Labels, Sets, Wishlist, User, Collection };