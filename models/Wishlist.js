const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our wishlist model
class Wishlist extends Model { }

// fields/columns for wishlist model
Wishlist.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        set_num: {
            type: DataTypes.STRING
        },
        set_img_url: {
            type: DataTypes.STRING
        },
        user_id: {
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
        freezeTableName: true,
        underscored: true,
        modelName: 'wishlist',
      }
    );

module.exports = Wishlist;