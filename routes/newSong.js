const apiAuthor = require("../config/apiAuthor");
const moveFile = require("../utils/moveFile");
const insertSong = require("../utils/insertSong");
const querystring = require("querystring");

const newSong = function (req, res) {
	req.socket.setTimeout(10 * 60 * 1000);
    const songName = req.body.songName;
    const singer = req.body.singer;
    const audio = req.files.audio;
    const thumb = req.files.thumb;
    moveFile(
        [audio.audio, audio.audioPath],
        [thumb.thumb, thumb.thumbPath],
        (result) => {
            if (result) {
                insertSong(
                    songName,
                    singer,
                    `${process.env.BASE_URL}/audio/${querystring.escape(
                        audio.audioPath
                    )}`,
                    `${process.env.BASE_URL}/thumb/${querystring.escape(
                        thumb.thumbPath
                    )}`
                ).then((inserted) => {
                    res.status(200).json({
                        status: true,
                        message: "Upload successfully!",
                        detail: inserted,
                        APIs_author: apiAuthor,
                    });
                });
            } else {
                res.status(500).json({
                    status: false,
                    message: "Failed to upload. Please try again.",
                    APIs_author: apiAuthor,
                });
            }
        }
    );
};

module.exports = newSong;
