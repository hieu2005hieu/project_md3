const { getCart, addToCart, deleteCart, changeQuantity, deleteCartALL } = require("../controllers/cart.controller");

const cartRouter = (app) => {
    app.get("/api/v1/cart/:user_id", getCart);
    app.post("/api/v1/cart", addToCart);
    app.delete("/api/v1/cart/:cartId", deleteCart);
    app.delete("/api/v1/carts/:idUser", deleteCartALL)
    app.patch("/api/v1/cart", changeQuantity);
};

module.exports = { cartRouter };