"use strict";

const bcrypt = require("bcrypt");
const { Users } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Users.create({
      fullName: "Superadmin",
      email: "superadmin@mail.com",
      role: "Super Admin",
      password: await bcrypt.hash("superadmin", 10),
      status: "Active",
      avatar: null,
    });

    await Users.create({
      fullName: "Creator",
      email: "creator@mail.com",
      role: "Creator",
      password: await bcrypt.hash("creator", 10),
      status: "Active",
      avatar: null,
    });
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
