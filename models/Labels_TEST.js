const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our labels model
class Labels extends Model { }

// create fields/columns for labels model
Labels.init(
    {
        label_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        label_name: {
            allowNull: false,
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        timestamps: false,
        // Prevent sequelize from renaming the table
        freezeTableName: true,
        underscored: true,
        modelName: 'labels'
    }
);

module.exports = Labels;
