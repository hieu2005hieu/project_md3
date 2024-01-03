const { getCartByUserId, checkProductInCart, updateQuantity, deleteCartSQL, addToCartMySQL, increSQL, deleteCartSQLall } = require("../services/cart.services");

async function getCart(req, res) {
    const { user_id } = req.params;

    const cart = await getCartByUserId(user_id);
    res.status(200).json(cart);
}


async function addToCart(req, res) {

    try {
        const check = await checkProductInCart(req.body);
        if (!check) {
            await addToCartMySQL(req.body);
            return res.status(200).json({
                message: "Thêm Vào Giỏ Hàng Thành Công",
            });
        }
        await updateQuantity(req.body);
        return res.status(200).json({
            message: "Sản Phẩm Đã Có Trong Giỏ Hàng Tăng Số Lượng",
        });
    } catch (error) {
        console.log(error);
    }
}
async function deleteCart(req, res) {
    const { cartId } = req.params;
    try {
        const data = await deleteCartSQL(cartId);
        res.status(200).json({
            data,
            message: "Xóa Giỏ Hàng Thành Công",
        });
    } catch (error) {
        console.log(error);
    }
}
async function deleteCartALL(req, res) {
    const { idUser } = req.params;
    try {
        const data = await deleteCartSQLall(idUser);
        res.status(200).json({
            data,
            message: "Xóa Giỏ Hàng Thành Công",
        });
    } catch (error) {
        console.log(error);
    }
}
async function changeQuantity(req, res) {
   
    const { cartId } = req.body;
    const { type } = req.body;

    try {
        const result = await increSQL(cartId, type);
        res.status(200).json({
            message: "tăng số lượng thành công",
        });
    } catch (error) {
        console.log(error);

    }
}
module.exports = {
    getCart,
    addToCart,
    deleteCart,
    changeQuantity,
    deleteCartALL
};