const { authRoute } = require("./auth.routes")
const { cartRouter } = require("./cart.routes")
const getCategory = require("./category.routes")
const { orderRouter } = require("./oder.routes")
const { orderDetailRouter } = require("./oder_detaill.routes")
const getproducs = require("./products.routes")
const userRouter = require("./user.routes")

const rootRoute = (app)=>{
    authRoute(app)
    userRouter(app)
    getproducs(app)
    getCategory(app)
    cartRouter(app)
    orderDetailRouter(app)
    orderRouter(app)
}
module.exports = rootRoute
