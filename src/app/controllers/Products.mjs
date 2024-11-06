import { Router } from "express";
import * as ProductsService from "../services/Products.mjs";

export const RouterProducts = Router();

RouterProducts.route("/product/:slug").get(async (req, res) => {
  const { slug } = req.params;
  const product = await ProductsService.getProduct(slug);
  const products = await ProductsService.getProducts().then(
    (products) => products.filter((product) => product.slug !== slug)
  );
  res.render("page/details", {...product, products});
});
