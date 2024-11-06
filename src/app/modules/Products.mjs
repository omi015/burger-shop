import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../util/sequelize.mjs";

export class Products extends Model {}

Products.init(
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull defaults to true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const value = this.getDataValue('description');
        return JSON.parse(value)
      },
      set(value) {
        this.setDataValue('description', JSON.stringify(value));
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Products", // We need to choose the model name
  }
);
(async () => {
  await Products.sync();
  const list = [
    {
      name: "Llanera",
      price: 45000,
      slug: "llanera",
      description: [
        "Carne molida (res)",
        "Pan de hamburguesa",
        "Lechuga",
        "Tomate en rodajas",
        "Cebolla",
        "Salsas (mayonesa, ketchup, o mostaza)",
        "Sal y pimienta al gusto",
      ],
    },
    {
      name: "Cheeseburger",
      price: 45000,
      slug: "cheeseburger",
      description: [
        "Carne molida (res)",
        "Pan de hamburguesa",
        "Queso cheddar (o tu preferido)",
        "Lechuga",
        "Tomate en rodajas",
        "Cebolla",
        "Salsas (mayonesa, ketchup, o mostaza)",
        "Sal y pimienta al gusto",
      ],
    },
    {
      name: "Cowboy Burger",
      price: 45000,
      slug: "cowboy-burger",
      description: [
        "Carne molida (res)",
        "Pan de hamburguesa",
        "Queso cheddar",
        "Cebolla caramelizada",
        "Bacon crujiente",
        "Salsa BBQ",
        "Jalapeños (opcional)",
        "Sal y pimienta al gusto",
      ],
    },
  ];
  const results = await Products.findAll();
  if(!results.length){
    await Products.bulkCreate(list);
  }
})();
