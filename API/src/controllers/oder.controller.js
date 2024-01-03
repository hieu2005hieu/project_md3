const {
    createOrderSQL,
    getbills,
    getAllbills,
    updatebill,
} = require("../services/oder.serves");
const { getDetail } = require("../services/oder_detaill.serces");
const { updateStocksProduct } = require("../services/products.services");
const { getUserById } = require("../services/user.services");

async function createOrder(req, res) {
    try {
        const orderId = await createOrderSQL(req.body);
        console.log(orderId);
        res.status(201).json({ orderId });
    } catch (error) {
        console.log(error);
    }
}
async function getbill(req, res) {
    const { idoder } = req.params;
    const bill = await getbills(idoder);
    res.status(200).json({
        bill,
    });
}
async function getAllbill(req, res) {
    const billAll = await getAllbills();
    res.status(200).json({
        billAll,
    });
}
async function updatebills(req, res) {
    try {
        const { id_updateBill } = req.params;
        const { status } = req.body;
        const productInBill = await getDetail(id_updateBill);
        const updateUser = await updatebill(id_updateBill, status);
        await Promise.all(
            productInBill.map(
                async (product) =>
                    await updateStocksProduct(product.producst_Id, product.quantity)
            )
        );
        const users = await getAllbills();
        res.status(200).json({
            message: "Update Thành Công",
            users
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    createOrder,
    getbill,
    getAllbill,
    updatebills,
};
