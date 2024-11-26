import { Router } from "express";

export const RouterPage = Router();


RouterPage.route("/login").get( (req, res) => {
    res.render("page/login");
    // if (req.session.user) {
    //     res.render("page/login");
    // }else{
    //     res.redirect("/");
    // }
  });
  RouterPage.route("/logout").get((req, res) =>{
    req.session.destroy(function(err) {
        console.log("destroy")
        res.redirect("/")
      })
  })
