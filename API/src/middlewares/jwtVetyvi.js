const jwt = require("jsonwebtoken");
const { checkUserByEmail } = require("../services/user.services");
async function checkname(req, res, next) {
    try {
        const { username } = req.body;
        if (username.length <6) {
            return res.status(400).json({
                message: "Nhập đủ 6 kí tự",
            });
        }
        next();
    } catch (error) {
        console.log(error);
    }
}
const checkEmailExist = async (req, res, next) => {
    const { email } = req.body;
    const checkEmail = await checkUserByEmail(email);
    if (checkEmail) {
        return res.status(400).json({
            message: "Email đã được đăng kí",
        });
    }
    next();
};
async function checkEmpty(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Không được để trống",
            });
        }
        next();
    } catch (error) {
        console.log(error);
    }
}
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const regexPass = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

async function checkfromemail(req, res, next) {

    try {
        const { email } = req.body;
        if (!regexEmail.test(email)) {
            return res.status(400).json({
                message: "Không đúng định dạng Email",
            });
        }
        next();
    } catch (error) {
        console.log(error);
    }
}
async function checkPassowrd(req, res, next) {
    try {
        const { password } = req.body;
        if (!regexPass.test(password)) {
            return res.status(400).json({
                message: "Mật khẩu: chữ cái đầu viết hoa có số",
            });
        }
        next();
    } catch (error) {
        console.log(error);
    }
}
async function checkconfrimPassword(req, res, next) {
   
    try {
        const { password,password_cofirm } = req.body;
        if (password!=password_cofirm) {
            return res.status(400).json({
                message: " Sai mật khẩu nhập lại",
            });
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

async function checkOnclick(req, res, next) {

    try {
        const { allowExtraEmails } = req.body;
        
        if (!allowExtraEmails) {
            return res.status(400).json({
                message: "Nhấn tích để xác nhận",
            });
        }
        next();
    } catch (error) {
        console.log(error);
    }
}








const verifyToken = (req, res, next) => {
    try {
        // Lấy token
        // authorization: Bearer token
        const token = req.headers.authorization?.split(" ")[1];
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: "Không tìm thấy token" });
        }
        jwt.verify(token, "MABIMATJWT", (err, data) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    // Nếu token đã hết hạn
                    return res.status(401).json({ message: "Token đã hết hạn" });
                } else {
                    // Nếu token không hợp lệ
                    return res.status(403).json({ message: "Token không hợp lệ" });
                }
            }
            // Nếu token hop le
            if (data.role != 1) {
                return res
                    .status(403)
                    .json({ message: "Bạn không được cấp quyền để thực hiện việc này!" });
            }
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};
module.exports = {
    verifyToken,
    checkEmailExist,
    checkEmpty,
    checkname,
    checkfromemail,
    checkPassowrd,
    checkconfrimPassword,
    checkOnclick
}