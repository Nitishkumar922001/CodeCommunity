'use strict';
const {
  Model,Sequelize
} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class Follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Follower.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    follower_id: {
      type: Sequelize.INTEGER,
      references:{
        model:{
          tableName:'users'
        },
        key:'userId',
        foreignKeyConstraint: true,
        onDelete:'CASCADE',
        onUpDate:'CASCADE'
      }
    },
    user_Id: {
      type: Sequelize.INTEGER,
      references:{
        model:{
          tableName:'users',
          
        },
        key:'userId',
        foreignKeyConstraint: true,
        onDelete:'CASCADE',
        onUpDate:'CASCADE'
      }

    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  } , {
    sequelize,
    modelName: 'Follower',
  });
  return Follower;
};