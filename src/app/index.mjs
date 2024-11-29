import express from "express";
import nunjucks from "nunjucks";
import { RouterProducts } from "./controllers/Products.mjs";
import session from "express-session";
import SQLiteStore from "connect-sqlite3";
import { RouterPage } from "./controllers/Admin.mjs";

export const app = express();

nunjucks.configure("src/template", {
  autoescape: false,
  express: app,
  noCache: true,
});
app.set("view engine", "njk");


app.use("/static", express.static("src/assets"));

const Store = SQLiteStore(session);
app.use(
  session({
    store: new Store({ dir: "db", db: "session.sqlite" }),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }),
  express.urlencoded()
);


app.use(RouterProducts, (req, res, next)=>{
  if(req.session.user){
    next();
  }else{
    res.redirect("/");
  }
}, RouterPage);


