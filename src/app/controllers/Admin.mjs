import { Router } from "express";
import { Products } from "../modules/Products.mjs";

export const RouterPage = Router();

RouterPage.route("/login").get((req, res) => {
  res.render("page/login", { login: Boolean(req.session.user) });
});
RouterPage.route("/logout").get((req, res) => {
  req.session.destroy(function (err) {
    console.log("destroy");
    res.redirect("/");
  });
});
