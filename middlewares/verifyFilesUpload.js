const Joi = require("@hapi/joi");
const path = require("path");
const deleteCached = require("../utils/deleteCached");
const apiAuthor = require("../config/apiAuthor");
const requireFields = require("../config/requireFields");

const songSchema = Joi.object({
    songName: Joi.string().required().max(255).min(5),
    singer: Joi.string().required().max(255).min(5),
});

const verifyFilesUpload = function (req, res, next) {
    const { error } = songSchema.validate(req.body);
    if (error) {
        deleteCached();
        return res.status(200).json({
            status: false,
            message: error.details[0].message,
            requireFields: requireFields,
            APIs_author: apiAuthor,
        });
    } else {
        if (req.files.audioFile && req.files.thumb) {
            const audioFile = req.files.audioFile[0];
            const thumbFile = req.files.thumb[0];
            const isExisting = audioFile && thumbFile;
            const validMimeType =
                audioFile.mimetype === "audio/mpeg" &&
                thumbFile.mimetype === ("image/jpeg" || "image/png");
            if (isExisting && validMimeType) {
                const audio = audioFile.path;
                const thumb = thumbFile.path;
                const audioPath = `${req.body.songName}_${req.body.singer}_${
                    audioFile.filename
                }${path.extname(audioFile.originalname)}`;
                const thumbPath = `${req.body.songName}_${req.body.singer}_${
                    thumbFile.filename
                }${path.extname(thumbFile.originalname)}`;
                req.files = {
                    audio: { audio, audioPath },
                    thumb: { thumb, thumbPath },
                };
                return next();
            } else {
                deleteCached();
                return res.status(200).json({
                    status: false,
                    message: `Hmmm! Invalid requirements.`,
                    requireFields: requireFields,
                    APIs_author: apiAuthor,
                });
            }
        } else {
            deleteCached();
            return res.status(200).json({
                status: false,
                message: "Hmmm! Missing requirements.",
                requireFields: requireFields,
                APIs_author: apiAuthor,
            });
        }
    }
};

module.exports = verifyFilesUpload;
