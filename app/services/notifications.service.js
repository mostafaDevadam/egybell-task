

let notifications = []

function getNextId() {
    if (notifications.length === 0) return 1;

    return Math.max(...notifications.map(u => u.id)) + 1;
}

function addNotification(data) {
    const obj = {
        id: getNextId(),
        isRead: false,
        ...data
    }
    notifications.push(obj)
    return obj
}


const findAll = () => {
    return notifications
}

const findById = (id) => {
    return notifications.find(n => n.id === id)
}

const readNotification =(id) => {
    const notify = findById(id)
    if (!id || !notify) return false
    notify.isRead = true
    return notify
}


const updateNotification = (id, data) => {
    const updated = notifications.map((m) => m.id === id && (m = data));
    console.log("updated:", updated)
    console.log("notifications after updated:", notifications)
    return updated
}


module.exports.NotificationsService = {
    notifications,
    addNotification,
    findAll,
    findById,
    readNotification,
    updateNotification,
}