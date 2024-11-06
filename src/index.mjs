import {createServer} from "node:http"

import { app } from "./app/index.mjs"

const server = createServer(app);
server.listen(3030, ()=>{
    console.log("http://localhost:3030");
    console.log("http://localhost:3000");
});