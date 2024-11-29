import { Products } from "../modules/Products.mjs";

export const getProducts = async () => {
  try {
    const product = await Products.findAll().then(
        (products) => products.map((item)=> item?.toJSON())
    );
    return product;
  } catch (error) {
    console.error(error);
  }
};


export const getProduct = async (slug) => {
  try {
    const product = await Products.findOne({ where: { slug } }).then(
      (item) => item?.toJSON()
    );
    return product;
  } catch (error) {
    console.error(error);
  }
};
export const getProductById = async (id) => {
  try {
    const product = await Products.findByPk(id, {raw:true})
    return product;
  } catch (error) {
    console.error(error);
  }
};