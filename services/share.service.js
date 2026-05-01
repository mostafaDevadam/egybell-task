

function getNextId(list) {
    if (list.length === 0) return 1;
    return Math.max(...list.map(u => u.id)) + 1;
}


module.exports.ShareService = {
    getNextId
}