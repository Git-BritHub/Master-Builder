const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our wishlist model
class Wishlist extends Model { }

// create fields/columns for wishlist model
Wishlist.init(
    {
        wish_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        wish_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        parts: {
            type: DataTypes.INTEGER
        },
        label_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'labels',
                key: 'label_id',
            },
        },
        set_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'sets',
                key: 'set_id',
            },
        },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        // Prevent sequelize from renaming the table
        freezeTableName: true,
        underscored: true,
        modelName: 'wishlist'
    }
);

module.exports = Wishlist;