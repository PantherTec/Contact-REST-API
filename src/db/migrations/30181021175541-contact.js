module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("contacts", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      /*
      number is set as a string because it is logical to make provision
			for numbers that begin with "+" i.e +234 numbers or international numbers
      */
      number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isStared: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Date.now()
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Date.now()
      }
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable("contacts");
  }
};
