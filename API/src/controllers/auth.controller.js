const argon = require("argon2")
const jwt= require("jsonwebtoken");
const { addUser, checkUserByEmail } = require("../services/user.services");
async function register(req, res) {
    try {
        console.log(req.body);
        const { username, email, password } = req.body;

        const hashedPassword = await argon.hash(password);
        const newId = await addUser(username, hashedPassword, email);
        if (!newId) {
            return res.status(500).json({
                message: "Server Lỗi",
            });
        }
        res.status(201).json({
            message: "Đăng Kí Thành Công",
        });
    } catch (error) {
        console.log(error);
    }
}
async function login(req, res) {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        const findUser = await checkUserByEmail(email);
        if (!findUser) {
            return res.status(400).json({ message: "Email Không Tồn Tại" });
        }
        const checkPassowrd = await argon.verify(findUser.password, password);
        if (!checkPassowrd) {
            return res.status(400).json({ message: "Sai Mật Khẩu Hoặc Tài Khoản" });
        }
        if (findUser.status == 0) {
            return res.status(400).json({ message: "Tài Khoản Của Bạn Bị Khóa " });
        }
        const token = jwt.sign(
            { id: findUser.id, role: findUser.role },
            "MABIMATJWT"
        );
        res.status(200).json({
            message: "Đăng Nhập Thành Công",
            token,
            findUser,
        });
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    register,
    login
}