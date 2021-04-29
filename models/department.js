"use strict";

module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    "Department",
    {
      name: DataTypes.STRING,
    },
    {
      tableName: "Department",
      timestamps: false,
    }
  );
  return Department;
};
