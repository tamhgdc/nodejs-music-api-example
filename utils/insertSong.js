const songModel = require("../models/songs");

module.exports = async function (songName, singer, path, thumb) {
    const song = new songModel({ songName, singer, path, thumb });
    return await song.save();
};
