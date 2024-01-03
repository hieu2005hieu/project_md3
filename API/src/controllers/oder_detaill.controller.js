const { createOrderDetailSQL, getDetail } = require("../services/oder_detaill.serces");

async function getDetailsBill(req, res) {
    try {
        const result = await getDetail(req.params.idBill)
        res.status(200).json({
            result
        })
    } catch (error) {
        console.log(error);
    }
}
async function createOrderDetail(req, res) {
    try {
        await createOrderDetailSQL(req.body);
        res.status(200).json({
            message: "Thành Công",
        });
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getDetailsBill,
    createOrderDetail,
};