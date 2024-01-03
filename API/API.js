const express = require("express")
const app = express()
const cors = require("cors")
const body_parser = require("body-parser");
const rootRoute = require("./src/router/roth.routes");
app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

rootRoute(app)
const poss=8888
app.listen(poss, () => {
    console.log("chay vao server 8888");
})