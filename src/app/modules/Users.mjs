import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../util/sequelize.mjs";

export class Users extends Model {}

Users.init(
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull defaults to true
    }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Users", // We need to choose the model name
  }
);
Users.sync();