import express from "express"
import nunjucks from "nunjucks"



export const app = express();

nunjucks.configure('src/template', {
    autoescape: false,
    express: app,
    noCache: true
});
app.set('view engine', 'njk');

// 
app.use('/static', express.static('src/assets'));

app.get("/", (req, res)=>{
    res.render("page/home");
});
app.get("/producto/:slug", (req, res)=>{
    res.render("page/llanera");
});