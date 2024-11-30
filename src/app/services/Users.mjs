import { Users } from "../modules/Users.mjs";

export const getUsers = async (body) => {
  try {
    const users = await Users.findAll().then((res) =>
      res.map((i) => i.toJSON())
    );
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (id) => {
  try {
    const user = await Users.findByPk(id);
    return user;
  } catch (error) {
    console.log(error);
  }
};
