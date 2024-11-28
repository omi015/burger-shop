import { Router } from "express";
import * as ProductsService from "../services/Products.mjs";
import { Users } from "../modules/Users.mjs";

export const RouterProducts = Router();

RouterProducts.route("/checkout").get(async(req, res)=>{
  res.render("page/checkout");
})


RouterProducts.route("/product/:slug").get(async (req, res) => {
  const { slug } = req.params;
  const product = await ProductsService.getProduct(slug);
  const products = await ProductsService.getProducts().then((products) =>
    products.filter((product) => product.slug !== slug)
  );
  res.render("page/details", { ...product, products });
});

//routes
RouterProducts.route("/")
  .get(async (req, res) => {
    const products = await ProductsService.getProducts();
    res.render("page/home", { products });
  })
  .post(async (req, res) => {
    const { name, password } = req.body;

    try {
      const getted = await Users.findOne({
        raw: true,
        where: { name: req.body.name },
      });
      if (getted) {
        req.session.user = getted;
      } else {
        const created = await Users.create(req.body, { raw: true });
        req.session.user = created;
      }
      console.log(req.session);
    } catch (error) {
      console.log(error);
    }
    res.redirect("/");
  });
