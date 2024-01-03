const database = require("../config/db.config");
async function getAllUsers() {
    try {
        const [user] = await database.execute("select * from users");
        return user;
    } catch (error) {
        console.log(error);
    }
}

async function getUserById(id) {
    try {
        const [findUser] = await database.execute("select * from users where idUser = ?", [
            id,
        ]);
        return findUser[0];
    } catch (error) {
        console.log(error);
    }
}

async function checkUserByEmail(email) {
    try {
        const [findUser] = await database.execute("select * from users where email = ?", [
            email,
        ]);
        return findUser[0];
    } catch (error) {
        console.log(error);
    }
}
async function addUser(user_name, password, email) {
    try {
        console.log(user_name);
        const [result] = await database.execute(
            "insert into users (username, password, email) values (?, ?, ?)",
            [user_name, password, email]
        );

        return result.insertId;

    } catch (error) {
        console.log(error);
    }
}

async function updateStatus(id, status) {
    try {
        const [result] = await database.execute("update users set status = ? where idUser = ?", [status, id])
        return result.insertId;
    } catch (error) {
        console.log(error)
    }
}
async function updateAvatarMySql(id, url) {
    try {
        const [result] = await database.execute("update users set img = ? where idUser = ?", [url, id])
        return result.info
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getAllUsers,
    checkUserByEmail,
    getUserById,
    addUser,
    updateStatus,
    updateAvatarMySql
}