const {getCategorys, addCate, deleteCategoey, updateCate} = require("../controllers/category.controller")



const getCategory = (app) => {
    app.get("/api/v1/Category", getCategorys)
    app.post("/api/v1/categories", addCate)
    app.delete("/api/v1/deleteCategory/:idCate", deleteCategoey)
    app.put("/api/v1/updeatCategory/:idcate", updateCate)
}
module.exports =  getCategory 