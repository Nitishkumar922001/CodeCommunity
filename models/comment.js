'use strict';
const DB=require('./index');
const {
  Model,Sequelize
} = require('sequelize');
const db = require('.');
module.exports = (sequelize, Sequelize) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  comment.init({
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
   
    commentedBy: {
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
    comment:{
      type:Sequelize.STRING,
      allowNull:false

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
    modelName: 'comment',
  });
//   DB.user.hasMany(comment,{foreignKey:commentedBy});
// DB.post.hasMany(comment,{foreignKey:postId});
  return comment;
};
