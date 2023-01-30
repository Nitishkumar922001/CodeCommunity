'use strict';
const DB=require('./index');
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post.init({

    postid: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    postedBy: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'users'
        },
        key: 'userId',
        foreignKeyConstraint: true,
        onDelete:'CASCADE'
      }

    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    body: {
      type: Sequelize.STRING,
      allowNull: false
    },
    postImage: {
      type: Sequelize.STRING

    }
    ,
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
    modelName: 'post',
  });
  // DB.user.belongsTo(post,{foreignKey:postedBy});
  return post;
};
