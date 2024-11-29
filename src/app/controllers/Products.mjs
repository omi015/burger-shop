import { Router } from "express";
import * as ProductsService from "../services/Products.mjs";
import { Users } from "../modules/Users.mjs";
import session from "express-session";
import { createOrder, getOrder } from "../services/Orders.mjs";

export const RouterProducts = Router();

RouterProducts.route("/thanks/:id").get(async (req, res) => {
  const {
    params: { id },
  } = req;
  const order = await getOrder(id);
  console.log(order);
  res.render("page/thanks", order);
});
RouterProducts.route("/thanks").post(async (req, res) => {
  try {
    const {
      body: { address, ProductId },
      session: {
        user: { id: UserId },
      },
    } = req;
    const order = await createOrder({ UserId, ProductId, address });
    console.log(order);
    res.redirect(`/thanks/${order.id}`);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

RouterProducts.route("/checkout").get(async (req, res) => {
  try {
    const {
      query: { id },
    } = req;
    const product = await ProductsService.getProductById(id);
    res.render("page/checkout", { product });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

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
    res.render("page/home", { products, login: Boolean(req.session.user) });
  })
  .post(async (req, res) => {
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
