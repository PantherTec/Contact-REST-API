module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      reset_password_token: {
        type: Sequelize.STRING
      },
      reset_password_expires: {
        type: Sequelize.DATE
      },

      createdAt: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: Date.now()
      },

      updatedAt: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: Date.now()
      }
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable("users");
  }
};
