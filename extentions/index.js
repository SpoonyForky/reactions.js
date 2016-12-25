const fs = require('fs');
const path = require('path');

const extentnions = fs.readdirSync(path.join(__dirname))
    .filter((f) => /^(?!index).+\.js$/gi.test(path.parse(f).base))
    .map((f) => {
        var obj = {};
        obj[path.parse(f).name] = require(path.join(__dirname, f));
        return obj;
    });

module.exports = extentnions;