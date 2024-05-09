"use strict";

const { Users } = require("../models");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //expriment kita
    // await Users.bulkCreate([
    //   {
    //     name: "Admin",
    //     email: "admin@wegodev.com",
    //     role: "admin",
    //     password: await bcrypt.hash("123456", 10),
    //   },
    //   {
    //     name: "Users",
    //     email: "user@wegodev.com",
    //     role: "user",
    //     password: await bcrypt.hash("123456", 10),
    //   },
    // ]);

    //default-nya ini
    // await queryInterface.bulkInsert(
    //   "Users",
    //   [
    //     {
    //       name: "Admin",
    //       email: "admin@wegodev.com",
    //       role: "admin",
    //       password: await bcrypt.hash("123456", 10),
    //     },
    //     {
    //       name: "Users",
    //       email: "user@wegodev.com",
    //       role: "user",
    //       password: await bcrypt.hash("123456", 10),
    //     },
    //   ],
    //   {}
    // );
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