RegExp.compileFromString = (str) => {
    var r = /^\/(.+?)\/([gmi]+?)$/i.compile();
    if (!r.test(str)) return null;
    else {
        var x = r.exec(str);
        return new RegExp(x[1], x[2]);
    }
};

module.exports = (str) => {
    var r = /^\/(.+?)\/([gmi]+?)$/i.compile();
    if (!r.test(str)) return null;
    else {
        var x = r.exec(str);
        return new RegExp(x[1], x[2]);
    }
};