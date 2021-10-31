const mongoose = require("mongoose");
const songModel = require("../models/songs");
const apiAuthor = require("../config/apiAuthor");

const getSongList = async function (req, res) {
    const data = [];
    for await (const song of songModel.find()) {
        data.push(song);
    }
    return res.status(200).json({
        status: true,
        message: "Free data of Music APIs.",
        APIs_author: apiAuthor,
        response: {
            total_length: data.length,
            song_list: data,
        },
    });
};

module.exports = getSongList;
