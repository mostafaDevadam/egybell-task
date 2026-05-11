
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


  const comparePassword = async (password, user) => await bcrypt.compare(password, user.password);

function verifyRefreshToken(refresh_token) {
    const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET)
    return decoded;
}


function generateRereshToken(user) {
    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_REFRESH_SECRET,
    );
    return token
}

function verifyAccessToken(access_token) {
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET)
    return decoded;
}


function generateAccessToken(user) {
    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: 60 }
    );
    return token
}


module.exports.AuthService = {
    verifyRefreshToken,
    generateRereshToken,
    verifyAccessToken,
    generateAccessToken,
    comparePassword,
}