
const uuid = require("uuid")


function getNextId(list) {
    if (list.length === 0) return 1;
    return Math.max(...list.map(u => u.id)) + 1;
}

const getUUID = () => uuid.v7()


module.exports.ShareService = {
    getNextId,
    getUUID,
}