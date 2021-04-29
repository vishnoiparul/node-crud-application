"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const departments = require("../../seeds/department.json");
    return queryInterface.bulkInsert(
      "Department",
      departments,
      {
        logging: console.log,
      },
      {
        id: {
          autoIncrement: true,
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Department", null, {});
  },
};
