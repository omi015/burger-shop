import { Router } from "express";

export const RouterPage = Router();


RouterPage.route("/login").get( (req, res) => {
    res.render("page/login");

  });
  RouterPage.route("/logout").get((req, res) =>{
    req.session.destroy(function(err) {
        console.log("destroy")
        res.redirect("/")
      })
  })
