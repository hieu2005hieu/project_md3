const database = require("../config/db.config");

async function getproducsa() {
    try {
        const [findProducts] = await database.execute(
            "select * from products order by idProducts desc"
        );
        return findProducts;
    } catch (error) {
        console.log(error);
    }
}
async function getProducsDetaill(id) {
    try {
        const [findProducts] = await database.execute(
            "select * from products where idProducts = ? ",
            [id]
        );

        return findProducts[0];
    } catch (error) {
        console.log(error);
    }
}
async function addproductsSQL(newProducts) {
    const { category_id, name, imgs, price, stock } = newProducts;
    // console.log("==> thong tin gui len",name, price, category_id, stock, imgs);
    try {
        const [result] = await database.execute(
            "insert into products (nameProducts,imgs,price,stock,categoryId, description ) values (?,?,?,?,?,?)",
            [name, imgs, +price, +stock, category_id, "Trống"]
        );
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}
async function deleteProductSQL(productId) {
    try {
        const [result] = await database.execute(
            "delete from products where idProducts = ?",
            [productId]
        );
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}
async function updateProductSQL(nameProducts, price, imgs, stock, categoryId, description, id) {
    console.log(nameProducts);
    try {
        const [result] = await database.execute(
            "update products set nameProducts = ?, imgs = ?, price = ?, stock = ?, description = ?, categoryId = ? where idProducts = ?",
            [nameProducts, imgs, +price, +stock, description, categoryId, id]
        );
        return result;
    } catch (error) {
        console.log(error);
    }
}



async function updateStocksProduct(productId, quantity) {
    try {
        const [result] = await database.execute(
            "update products set stock = stock - ? where idProducts = ?",
            [quantity, productId]
        );
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}
async function getProductsByName(name) {
    try {
        const [products] = await database.execute(
            `select * from products where nameProducts like '%${name}%'`
        );
        return products;
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getproducsa,
    getProducsDetaill,
    addproductsSQL,
    deleteProductSQL,
    updateProductSQL,
    getProductsByName,
    updateStocksProduct,
};
