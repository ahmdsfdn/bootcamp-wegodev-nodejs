"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("Files", {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        filename: {
          type: Sequelize.STRING,
        },
        type: {
          type: Sequelize.STRING,
        },
        url: {
          type: Sequelize.STRING,
        },
        path: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
      })
      .then(async () => {
        await queryInterface.addConstraint("Users", {
          fields: ["avatar"],
          type: "foreign key",
          name: "avatar_Files_FK",
          references: {
            table: "Files",
            field: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        });
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Files");
  },
};
