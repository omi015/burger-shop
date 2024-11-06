import express from "express"
import nunjucks from "nunjucks"
import { RouterProducts } from "./controllers/Products.mjs";
import * as ProductsService from "./services/Products.mjs";



export const app = express();

nunjucks.configure('src/template', {
    autoescape: false,
    express: app,
    noCache: true
});
app.set('view engine', 'njk');

// 
app.use('/static', express.static('src/assets'));

app.get("/", async(req, res)=>{
    const products = await ProductsService.getProducts();
    res.render("page/home", {products});
});
app.use(RouterProducts);