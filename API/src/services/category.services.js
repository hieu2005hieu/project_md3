const database = require("../config/db.config");


async function getCategoryprodus() {

    try {

        const [findcategory] = await database.execute("select * from category")
        return findcategory;
    } catch (error) {
        console.log(error);
    }
}
async function addCateSQL(nameCate,img) {
    const [cate] = await database.execute("insert into category (nameCategory,img) values (?,?)", [nameCate,img]);
    return cate.insertId
}
async function deleteCategoryId(id) {
    
    try {
        const [result] = await database.execute(
            "delete from category where idCategory  = ?",
            [id]
        );
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}
async function updateCategory(nameProducts, img, id) {
    
    
    try {
        const [result] = await database.execute(
            "update category set nameCategory = ?, img = ? where idCategory = ?",
            [nameProducts, img, id]
        );
        return result;
    } catch (error) {
        console.log(error);
    }
}
module.exports = { getCategoryprodus, addCateSQL, deleteCategoryId, updateCategory }