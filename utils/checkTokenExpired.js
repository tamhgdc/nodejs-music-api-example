module.exports = function (payload) {
    if (Date.now() <= (payload.exp || 0)) return false;
    return true;
};
