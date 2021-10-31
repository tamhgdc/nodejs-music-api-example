const API_SIGNATURE = process.env.API_SIGNATURE;
const apiAuthor = require("../config/apiAuthor");

const apiAuth = function (req, res, next) {
    if (!req.query.signature || req.query.signature !== API_SIGNATURE) {
        return res.status(401).json({
            status: false,
            message: "Permission denied. Invalid signature.",
            APIs_author: apiAuthor,
        });
    }
    return next();
};

module.exports = apiAuth;
