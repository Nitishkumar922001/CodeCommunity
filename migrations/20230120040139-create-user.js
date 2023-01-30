'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      
      userId: {
        
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true
      },
      hashedPassword: {
        type: Sequelize.STRING,
        allowNull:false
      },
      createdAt: {
       
        type: Sequelize.DATE
      },
      updatedAt: {
        
        type: Sequelize.DATE
      }
      // ,
      // password: {
      //   type: Sequelize.DataTypes.VIRTUAL,
        
      //   get()
      //   {
      //     const pass=this.getDataValue('password');
      //     return pass;
      //   },

      //   set(value)
      //   {
      //     this.setDataValue('password',value)

      //   }
      // }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};