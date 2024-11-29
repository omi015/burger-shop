import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../util/sequelize.mjs";
import { Users } from "./Users.mjs";
import { Products } from "./Products.mjs";

export class Orders extends Model {}

Orders.init(
  {
    // Model attributes are defined here
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Orders", // We need to choose the model name
  }
);
Orders.belongsTo(Products);
Orders.belongsTo(Users);
Orders.sync();