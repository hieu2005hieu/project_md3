const { register, login } = require("../controllers/auth.controller")
const { checkEmpty, checkEmailExist, checkname, checkPassowrd, checkconfrimPassword, checkfromemail, checkOnclick } = require("../middlewares/jwtVetyvi")

const authRoute = (app) => {
    app.post("/api/v1/Regiter", checkEmpty, checkname, checkfromemail, checkEmailExist, checkPassowrd,checkconfrimPassword,checkOnclick,register)
    app.post("/api/v1/Login", checkEmpty, checkfromemail,login)
}
module.exports = {
    authRoute
}