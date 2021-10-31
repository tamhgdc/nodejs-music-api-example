const requireFields = {
    songName: { type: "string", max: 255, min: 5 },
    singer: { type: "string", max: 255, min: 5 },
    audioFile: { type: "file", mimetype: "audio/mpeg" },
    thumb: {
        type: "file",
        mimetype: ["image/jpeg", "image/png"],
    },
};

module.exports = requireFields;
