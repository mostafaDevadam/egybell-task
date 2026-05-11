const { ShareService } = require("./share.service");
const { UserService } = require("./user.service");

let logins = []

const create = (data) => {
    const login = {
        id: ShareService.getNextId(logins),
        timestamp: new Date().toISOString(),
        ...data,
    };
    logins.push(login)
}

const findAllWithUsers = () => {
    const ls = logins.map((m) => {
        const user = UserService.getUserById(m.user_id)
        if (!user) return false
        console.log("login user:", user)
        const l = { ...m, user };
        console.log("login l:", l)
        return l;
    });
    return ls
}

const findAll = () => logins

module.exports.LoginService = {
    logins,
    create,
    findAllWithUsers,
    findAll,
}