"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const employees = require("../../seeds/employee.json");
    return queryInterface.bulkInsert(
      "Employee",
      employees,
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
    return queryInterface.bulkDelete("Employee", null, {});
  },
};
