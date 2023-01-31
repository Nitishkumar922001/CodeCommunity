'use strict';
const {
  Model,Sequelize} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  likes.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    postId: {
      type: Sequelize.INTEGER,
      references:{
        model:{
          tableName:'posts'
        },
        key:'postId',
        foreignKeyConstraint: true,
        onDelete:'CASCADE'
        
      }
    },
   
    likedBy: {
      type: Sequelize.INTEGER,
      allowNull:false,
      references:{
        model: {
          tableName: 'users',
          
        },
        key: 'userId',
        foreignKeyConstraint: true,
        onDelete:'CASCADE'
      }
    },
    
  }, {
    sequelize,
    modelName: 'likes',
  });
  return likes;
};