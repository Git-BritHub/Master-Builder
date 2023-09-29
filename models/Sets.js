const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our sets model
class Sets extends Model { }

// create fields/columns for sets model
Sets.init(
    {
        set_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        set_name: {
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
        modelName: 'sets'
    }
);

module.exports = Sets;