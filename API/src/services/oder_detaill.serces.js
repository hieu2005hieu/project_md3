const database = require("../config/db.config");
async function getDetail(id) {
    try {
        const [result] = await database.execute("select * from bills_details INNER JOIN products ON bills_details.producst_Id=products.idProducts where bills_details_Id = ?", [id])
        return result
    } catch (error) {
        console.log(error);
    }
}
async function createOrderDetailSQL(order) {
    try {
        console.log(order);
        const [result] = await database.execute(
            "insert into bills_details (bills_details_Id, producst_Id, quantity) values (?,?,?)",
            [order.order_id, order.productsId, order.quantity]
        );
        return result;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getDetail,
    createOrderDetailSQL,
};
