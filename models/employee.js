"use strict";

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
      name: DataTypes.STRING,
      jobTitle: DataTypes.STRING,
      department: DataTypes.STRING,
      location: DataTypes.STRING,
      age: DataTypes.INTEGER,
      salary: DataTypes.INTEGER,
    },
    {
      tableName: "Employee",
      timestamps: true,
    }
  );
  return Employee;
};
