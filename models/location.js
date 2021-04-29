"use strict";

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    "Location",
    {
      name: DataTypes.STRING,
    },
    {
      tableName: "Location",
      timestamps: false,
    }
  );
  return Location;
};
