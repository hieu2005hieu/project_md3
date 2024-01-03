const { getAllUsers, updateStatus, getUserById, updateAvatarMySql } = require("../services/user.services");

async function getUser(req, res) {
    const users = await getAllUsers();
    res.status(200).json({
        users,
        message: "Bạn Là ADMIN",
    });
}
async function getUsers(req, res) {
    const users = await getAllUsers();
    res.status(200).json({
        users,
        message: "Lấy Về",
    });
}

async function updateStatusUser(req, res) {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        const newStatus = !user.status;
        const updateUser = await updateStatus(id, newStatus);
        const users = await getAllUsers();
        res.status(200).json({
            message: "Update Thành Công",
            users
        })
    } catch (error) {
        console.log(error)
    }
}
async function updateAvatar(req, res) {
    const { id } = req.params
    const { url } = req.body
    try {
        await updateAvatarMySql(id, url);
        const user = await getUserById(id)
        res.status(200).json({
            message: "Update avatar",
            user
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getUser, getUsers, updateStatusUser, updateAvatar }