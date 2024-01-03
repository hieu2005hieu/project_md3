const database = require("../config/db.config");

async function getCartByUserId(IdUser) {
    try {
        const [cart_user] = await database.execute(
            "select * from cart join products on cart.ProductsID = products.idProducts join category on products.categoryId = category.idCategory where IdUser = ?",
            [IdUser]
        );
        return cart_user;
    } catch (error) {
        console.log(error);
    }
}
async function getminel(IdUser) {
    try {
        const [cart_user] = await database.execute(
            "select * from cart join products on cart.ProductsID = products.idProducts join category on products.categoryId = category.idCategory where IdUser = ?",
            [IdUser]
        );
        return cart_user;
    } catch (error) {
        console.log(error);
    }
}

async function checkProductInCart(cart) {
    try {
        const [check] = await database.execute(
            "select * from cart where IdUser = ? and ProductsID = ?",
            [cart.userId, cart.product]
        );
        return check[0];
    } catch (error) {
        console.log(error);
    }
}
async function addToCartMySQL(cart) {
    try {

        const [result] = await database.execute(
            "insert into cart (IdUser,ProductsID, quantity) values (?,?,1)",
            [cart.userId, cart.product]
        );
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}
async function updateQuantity(cart) {
    try {
        const [result] = await database.execute(
            "update cart set quantity = quantity + 1 where IdUser = ? and ProductsID = ?",
            [cart.userId, cart.product]
        );
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}
async function deleteCartSQL(cartId) {
    try {
        const [result] = await database.execute("delete from cart where idCart = ?", [
            cartId,
        ]);
        return result;
    } catch (error) {
        console.log(error);
    }
}
async function increSQL(id, type) {
    try {
        if (type == "incre") {
            const [result] = await database.execute(
                "update cart set quantity = quantity + 1 where idCart = ?",
                [id]
            );
            return result.insertId;
        } else {
            const [result] = await database.execute(
                "update cart set quantity = quantity - 1 where idCart = ?",
                [id]
            );
            return result.insertId;

        }

    } catch (error) {
        console.log(error);
    }
}



async function deleteCartSQLall(idUser) {
    console.log(idUser,"delete");
    try {
        const [result] = await database.execute("delete from cart where IdUser = ?", [
            idUser,
        ]);
        return result;
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getCartByUserId,
    checkProductInCart,
    addToCartMySQL,
    updateQuantity,
    deleteCartSQL,
    increSQL,
    deleteCartSQLall
};