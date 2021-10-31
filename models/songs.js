const mongoose = require("mongoose");
const songsSchema = new mongoose.Schema(
    {
        songName: {
            type: String,
            require: true,
        },
        singer: {
            type: String,
            require: true,
        },
        path: {
            type: String,
            require: true,
        },
        thumb: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Song", songsSchema);
