const apiAuth = require("../middlewares/apiAuth");
const getSongList = require("./getSongList");
const accessToken = require("./login");
const newSong = require("./newSong");
const multer = require("multer");
const upload = multer({ dest: "./cached" });
const verifyFilesUpload = require("../middlewares/verifyFilesUpload");
const accessTokenVerify = require("../middlewares/accessTokenVerify");

const route = function (app) {
    app.get("/", apiAuth, getSongList);
    app.post("/access_token/", apiAuth, accessToken);
    app.post(
        "/music/add",
        apiAuth,
        upload.fields([
            {
                name: "audioFile",
                maxCount: 1,
            },
            {
                name: "thumb",
                maxCount: 1,
            },
        ]),
        accessTokenVerify,
        verifyFilesUpload,
        newSong
    );
};

module.exports = route;
