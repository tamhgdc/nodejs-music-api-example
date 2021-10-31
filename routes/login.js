const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenVerify = require("../utils/tokenVerify");
const apiAuthor = require("../config/apiAuthor");

const userSchema = Joi.object({
    username: Joi.string().required().max(255).min(5),
    password: Joi.string().required().max(255).min(6),
});
const login = async function (req, res) {
    const { error } = userSchema.validate(req.body);
    if (error) {
        res.status(200).json({
            status: false,
            message: error.details[0].message,
            APIs_author: apiAuthor,
        });
    } else {
        const username = req.body.username.trim();
        const password = req.body.password.trim();
        const token = jwt.sign(
            { username, exp: Date.now() + 60000 * 60 },
            process.env.TOKEN_SECRET
        );
        // bcrypt.hash(password, 10, function (err, hash) {
        //     // Store hash in your password DB.
        //     console.log(hash);
        // });
        if (username && username === process.env.USER_NAME) {
            bcrypt.compare(password, process.env.USER_PASS, (err, success) => {
                if (success) {
                    res.status(200).json({
                        status: true,
                        message: "Success!",
                        response: {
                            token: token,
                        },
                        APIs_author: apiAuthor,
                    });
                } else {
                    res.status(401).json({
                        status: false,
                        message: "Hmmm! Password is incorrect",
                        APIs_author: apiAuthor,
                    });
                }
            });
        } else {
            res.status(401).json({
                status: false,
                message: "Hmmm! Username is invalid",
                APIs_author: apiAuthor,
            });
        }
    }
};

module.exports = login;
