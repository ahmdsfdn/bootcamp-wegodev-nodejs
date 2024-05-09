"use strict";

const { faker } = require("@faker-js/faker");
const { Users } = require("../models");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tempData = [];

    for (let i = 0; i < 150; i++) {
      tempData.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: "user",
        password: await bcrypt.hash(faker.internet.password(), 10),
      });
    }

    await Users.bulkCreate(tempData);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};