const { createOrderDetail, getDetailsBill } = require("../controllers/oder_detaill.controller");


const orderDetailRouter = (app) => {
    app.get("/api/v1/order_details/:idBill", getDetailsBill)
    app.post("/api/v1/order_details", createOrderDetail);
};
module.exports = {
    orderDetailRouter,
};