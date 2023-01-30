'use strict';
const DB=require('./index');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class userProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userProfile.init({
    userId: {
      allowNull: false,
      primaryKey:true,
      type: Sequelize.INTEGER,
      references:{
        model: {
          tableName: 'users',
          
        },
        key: 'userId',
        foreignKeyConstraint: true,
        onDelete:'CASCADE'
      }

    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    DOB: {
      type: Sequelize.DATEONLY
    },
    profileImage: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {
    sequelize,
    modelName: 'userProfile',
  });
  // 
  return userProfile;
};
