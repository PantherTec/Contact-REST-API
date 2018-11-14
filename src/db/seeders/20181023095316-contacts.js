const seed = async users => {
  const seedSet = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(count => ({
    name: `contact_${count}`,
    number: `081002234${count}`,
    isStared: false,
    userId:
      users[0].id /*first user in our array of users(will have the id: 1)*/,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }));
  return [...seedSet];
};
module.exports = {
  up: async queryInterface => {
    const users = await queryInterface.sequelize.query("SELECT id from users;");
    return queryInterface.bulkInsert("contacts", await seed(users[0]), {
      returning: true
    });
  },
  down: queryInterface => queryInterface.bulkDelete("contacts", null, {})
};
