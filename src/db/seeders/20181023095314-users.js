const bcrypt = require("bcrypt");

const encyrptPassword = async plaintextPassword =>
  bcrypt.hash(plaintextPassword, 10);

const SeedData = async () => {
  /* function for hashing our password*/
  const hashedPassword = await encyrptPassword("LastOfA-dyingBreed");
  const userSet = [1, 2, 3, 4, 5, 6, 7, 8].map(count => ({
    username: `username_${count}`,
    email: `user_${count}@gmail.com`,
    password: hashedPassword,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }));

  return [...userSet];
};

module.exports = {
  up: async queryInterface =>
    queryInterface.bulkInsert("users", await SeedData(), {
      returning: true
    }),

  down: async queryInterface => queryInterface.bulkDelete("users", null, {})
};
