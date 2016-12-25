RegExp.compileFromString = (str) => {
    var r = /^\/(.+?)\/([gmi]+?)$/i.exec(str);
    return new RegExp(r[1], r[2]);
};

module.exports = (str) => {
    var r = /^\/(.+?)\/([gmi]+?)$/i.exec(str);
    return new RegExp(r[1], r[2]);
};