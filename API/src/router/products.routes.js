const {getProducts, getProductstitle, addProduct, deleteProduct, updateProduct, getProductsBySearch} = require("../controllers/products.controller")


const getproducs = (app) => {
    app.get("/api/v1/Producs", getProducts)
    app.get("/api/v1/produscts/:id", getProductstitle)
    app.post("/api/v1/addproducts", addProduct)
    app.delete("/api/v1/delete/:id", deleteProduct)
    app.put("/api/v1/edit/:id", updateProduct)
    app.get("/api/v1/search", getProductsBySearch)
}
module.exports=getproducs