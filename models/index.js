const Labels = require('./labels');
const Sets = require('./sets');
const Wishlist = require('./wishlist');

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

module.exports = { Labels, Sets, Wishlist };