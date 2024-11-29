import { Orders } from "../modules/Ordes.mjs";
import { Users } from "../modules/Users.mjs";
import { Products } from "../modules/Products.mjs";

export const createOrder = async (body) => {
  try {
    const order = await Orders.create(body, {
      include: [Users, Products],
      raw: true,
    });
    return order;
  } catch (error) {
    console.log(error);
  }
};
export const getOrder = async (id) => {
  try {
    const order = await Orders.findByPk(id, {
      include: [Users, Products],
    }).then((res) => res.toJSON());
    return order;
  } catch (error) {
    console.log(error);
  }
};
