const fs = require("fs");

module.exports = function (songFile, songThumb, callback) {
    const song_old = `${songFile[0]}`;
    const song_new = `public/audio/${songFile[1]}`;
    const thumb_old = `${songThumb[0]}`;
    const thumb_new = `public/thumb/${songThumb[1]}`;

    fs.rename(song_old, song_new, function (err) {
        if (err) return callback(false);
        fs.rename(thumb_old, thumb_new, function (err) {
            if (err) return callback(false);
            return callback(true);
        });
    });
};
