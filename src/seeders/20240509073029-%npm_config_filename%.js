"use strict";

const { faker } = require("@faker-js/faker");
const { Users } = require("../models");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tempData = [];

    for (let i = 0; i < 5; i++) {
      tempData.push({
        nama: faker.person.fullName(),
        email: faker.internet.email(),
        role: "user",
        password: await bcrypt.hash(faker.internet.password(), 10),
        profile: {
          alamat: faker.location.streetAddress(),
          no_hp: faker.phone.number(),
        }
      });
    }

    await Users.bulkCreate(tempData,{
        include: [
          {
            association: 'profile',
          },
        ],
      },
    );


    // Test One
    // await Users.create(
    //   {
    //     nama: faker.person.fullName(),
    //     email: faker.internet.email(),
    //     role: "user",
    //     password: await bcrypt.hash(faker.internet.password(), 10),
    //     profile: {
    //       alamat: faker.location.streetAddress(),
    //       no_hp: faker.phone.number(),
    //     }
    //   },
    //   {
    //     include: [
    //       {
    //         association: 'profile',
    //       },
    //     ],
    //   },
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