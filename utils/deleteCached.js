const fs = require("fs");
const path = require("path");
const cachedFolder = "cached";

module.exports = function () {
    fs.readdir(cachedFolder, (err, files) => {
        if (err) return;
        for (const file of files) {
            fs.unlink(path.join(cachedFolder, file), (err) => {
                if (err) return;
            });
        }
        return;
    });
};
