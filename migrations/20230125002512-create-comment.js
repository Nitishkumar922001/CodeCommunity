'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
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
          onDelete:'CASCADE',
          
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};