import { Router } from "express";
import { Products } from "../modules/Products.mjs";
import { getUser, getUsers } from "../services/Users.mjs";

export const RouterPage = Router();

RouterPage.route("/login").get(async (req, res) => {
  const users = await getUsers();
  res.render("page/login", {
    users,
    alert: req.session.alert,
    login: Boolean(req.session.user),
  });
  delete req.session.alert;
});

RouterPage.route("/user/:id")
  .get(async (req, res) => {
    const {
      params: { id },
    } = req;
    const user = await getUser(id).then((res) => res.toJSON());
    res.render("page/user", { ...user, login: Boolean(req.session.user) });
  })
  .post(async (req, res) => {
    const {
      params: { id },
      body,
    } = req;
    const user = await getUser(id);
    if (user) {
      await user.update(body);
      req.session.alert = "Usuario actualizado";
    }

    res.redirect("/login");
  });

RouterPage.route("/user/delete/:id")
  .get(async (req, res) => {
    const {
      params: { id },
    } = req;
    const user = await getUser(id).then((res) => res.toJSON());
    res.render("page/delete", { ...user, login: Boolean(req.session.user) });
  })
  .post(async (req, res) => {
    const {
      params: { id },
    } = req;
    const user = await getUser(id);
    if (user) {
      await user.destroy();
      req.session.alert = "Usuario eliminado";
    }

    res.redirect("/login");
  });

RouterPage.route("/logout").get((req, res) => {
  req.session.destroy(function (err) {
    console.log("destroy");
    res.redirect("/");
  });
});
