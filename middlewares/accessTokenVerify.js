const API_SIGNATURE = process.env.API_SIGNATURE;
const deleteCached = require("../utils/deleteCached");
const apiAuthor = require("../config/apiAuthor");
const tokenVerify = require("../utils/tokenVerify");
const checkTokenExpiration = require("../utils/checkTokenExpired");

const accessTokenVerify = function (req, res, next) {
    const token = req.query.token;
    tokenVerify(token).then((payload) => {
        // Invalid access token
        if (checkTokenExpiration(payload)) {
            deleteCached();
            return res.status(401).json({
                status: false,
                message: `Permission denied. Token is invalid or has been expired.`,
                APIs_author: apiAuthor,
            });
        } else {
            next();
        }
    });
};

module.exports = accessTokenVerify;
