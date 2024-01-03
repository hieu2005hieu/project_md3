const { createOrder, getbill, getAllbill, updatebills } = require("../controllers/oder.controller");



const orderRouter = (app) => {
    app.get("/api/v1/billsALL",getAllbill)
    app.get("/api/v1/orders/:idoder", getbill)
    app.put("/api/v1/update/:id_updateBill",updatebills)
    app.post("/api/v1/orders", createOrder);
};
module.exports = {
    orderRouter,
};