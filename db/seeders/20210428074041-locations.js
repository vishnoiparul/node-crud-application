"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const locations = require("../../seeds/location.json");
    return queryInterface.bulkInsert(
      "Location",
      locations,
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
    return queryInterface.bulkDelete("Location", null, {});
  },
};
