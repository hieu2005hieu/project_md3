const {getCategoryprodus, addCateSQL, deleteCategoryId, updateCategory} = require("../services/category.services");


async function getCategorys(req, res) {
    const category = await getCategoryprodus();
    res.status(200).json({
        category,
    });
}
async function addCate(req, res) {
    
    try {
       console.log(req.body);
        const { nameCategory,img } = req.body
        const result = await addCateSQL(nameCategory,img)
        if (!result) {
            return res.status(500).json({
                message: "Thêm Category Thất Bại",
            });
        }
        const cates = await getCategoryprodus();
        res.status(200).json({
            message: "Thêm Category Thành Công",
            cates,
        });
    } catch (error) {
        console.log(error)
    }
}
async function deleteCategoey(req, res) {
    try {
        console.log(req.params);
        const { idCate } = req.params;
        const result = await deleteCategoryId(idCate);
        const products = await getCategoryprodus();
        res.status(200).json({
            message: "Xóa Sản Phẩm Thành Công",
            products,
        });
    } catch (error) {
        console.log(error)
    }
}
async function updateCate(req, res) {
    
    try {
        console.log(req.body);
        const { idcate } = req.params;
        const { nameCategory,imgs} =
            req.body;
        const result = await updateCategory(
            nameCategory, imgs, idcate
        );
        const products = await getCategoryprodus();
        res.status(200).json({
            message: "Sửa Sản Phẩm Thành Công",
            products,
        });
    } catch (error) {
        console.log(error);
    }
}
module.exports = { getCategorys, addCate, deleteCategoey, updateCate }