const { getUser, getUsers, updateStatusUser, updateAvatar } = require("../controllers/user.controller")
const { verifyToken } = require("../middlewares/jwtVetyvi")

const userRouter = (app) => {
    app.get("/api/user", verifyToken, getUser)
    app.get("/api/v1/users", getUsers)
    app.patch("/api/user/:id", updateStatusUser)
    app.patch("/api/v1/user/:id", updateAvatar)
}
module.exports = userRouter