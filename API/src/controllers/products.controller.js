const { getproducsa, getProducsDetaill, addproductsSQL, deleteProductSQL, updateProductSQL, getProductsByName } = require("../services/products.services");

async function getProducts(req, res) {
    const products = await getproducsa();
    res.status(200).json({
        products,
    });
}
async function getProductstitle(req, res) {
    const { id } = req.params

    const productsDetaill = await getProducsDetaill(id)
    res.status(200).json({
        productsDetaill,
    });
}
async function addProduct(req, res) {
    try {
        const result = await addproductsSQL(req.body);
        if (!result) {
            return res.status(500).json({
                message: "Có Lỗi Khi Thêm Sản Phẩm",
            });
        }
        const products = await getproducsa();
        res.status(200).json({
            message: "Thêm Sản Phẩm Thành Công",
            products,
        });
    } catch (error) {
        console.log(error);
    }
}
async function deleteProduct(req, res) {
    try {
        console.log(req.params);
        const { id } = req.params;
        const result = await deleteProductSQL(id);
        const products = await getproducsa();
        res.status(200).json({
            message: "Xóa Sản Phẩm Thành Công",
            products,
        });
    } catch (error) {
        console.log(error)
    }
}
async function updateProduct(req, res) {
    console.log(req.body);
    try {
        const { id } = req.params;
        const { nameProducts, price, imgs, stock, categoryId, description } =
            req.body;
        const result = await updateProductSQL(
            nameProducts, price, imgs, stock, categoryId, description, id
        );
        const products = await getproducsa();
        res.status(200).json({
            message: "Sửa Sản Phẩm Thành Công",
            products,
        });
    } catch (error) {
        console.log(error);
    }
}
async function getProductsBySearch(req, res) {
    const { key } = req.query;
    try {
        const result = await getProductsByName(key);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getProductstitle,
    getProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    getProductsBySearch
} 