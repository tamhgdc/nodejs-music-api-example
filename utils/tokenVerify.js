const jwt = require("jsonwebtoken");

module.exports = async function (token) {
    try {
        return await jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
        return false;
    }
};
