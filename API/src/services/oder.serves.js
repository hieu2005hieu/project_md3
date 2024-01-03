const database = require("../config/db.config");

async function createOrderSQL(order) {
    try {
        console.log("22222222", order);
        const [result] = await database.execute(
            "insert into bill (userID, total,phone_number,status,nameUserbill,address) values (?,?,?,?,?,?)",
            [order.userID, order.total, order.phone, order.status, order.user_name, order.address]
        );
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}
async function getbills(idorder) {
    try {
        const [findbill] = await database.execute("select * from bill where userID = ? order by idBill desc", [idorder])
        return findbill;
    } catch (error) {
        console.log(error);
    }
}

async function getAllbills() {
    try {
        const [billAlls] = await database.execute("select * from bill order by idBill desc")
        return billAlls
    } catch (error) {
        console.log(error);
    }
}
async function updatebill(id, status) {
    try {
        const [result] = await database.execute("update bill set status = ? where idBill = ?", [status, id])
        return result.insertId;
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    createOrderSQL,
    getbills,
    getAllbills,
    updatebill
};