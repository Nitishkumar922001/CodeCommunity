'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('likes', {
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
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('likes');
  }
};