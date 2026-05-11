const { UserService } = require("./user.service");

let logs = [];


function getNextId() {
    if (logs.length === 0) return 1;
    return Math.max(...logs.map(u => u.id)) + 1;
}


const create = (data) => {
    const log = {
        ...data,
        id: getNextId(),
        timestamp: new Date().toISOString(),
    };
    logs.push(log)
}

const findAll = () => {
    return logs
}

const findAllWithUsers = () => {
    const ls = logs.map((m) => {
        const user = UserService.getUserById(m.user_id)
        if (!user) return false
        console.log("log user:", user)
        const l = { ...m, user };
        console.log("log l:", l)
        return l;
    });
    return ls
}

module.exports.logs = logs
module.exports.LogService = {
    logs, create, findAll, findAllWithUsers

}