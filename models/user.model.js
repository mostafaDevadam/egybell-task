let users = [];


function getNextId() {
    if (users.length === 0) return 1;

    return Math.max(...users.map(u => u.id)) + 1;
}

function addUser(email, role, password) {
    const user = {
        id: getNextId(),
        email,
        password,
        role
    };
    users.push(user);
    return user
}

const getUserByEmail = (email) => users.find(u => u.email === email);


const getUserById = (id) => users.find(u => u.id === id);

const getAllUsers = () => users


function deleteUserById(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        users.splice(index, 1); // ✅ modifies array in place
        console.log("users after deleted:", users)
        return index
    }

    return false
    


}

const updateUser = (id, user) => {
    const updated = users.map((m) => m.id === id && (m = user));
    console.log("updated:", updated)
    console.log("users after updated:", users)
    return updated
}


module.exports = { getAllUsers, updateUser, deleteUserById, getUserById, addUser, getUserByEmail }
