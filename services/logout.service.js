const { ShareService } = require("./share.service");
const { UserService } = require("./user.service");


let logouts = []

const create = (data) => {
    const login = {
        id: ShareService.getNextId(logouts),
        timestamp: new Date().toISOString(),
        ...data,
    };
    logouts.push(login)
    console.log("logouts:", logouts)
}

const findAllWithUsers = () => {
    const ls = logouts.map((m) => {
        const user = UserService.getUserById(m.user_id)
        if (!user) return false
        console.log("logout user:", user)
        const l = { ...m, user };
        console.log("logout l:", l)
        return l;
    });
    return ls
}

const findAll = () => logouts


module.exports.LogoutService = {
    logouts,
    create,
    findAllWithUsers,
    findAll,
}