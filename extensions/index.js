const fs = require('fs');
const path = require('path');

const extensions = {};
fs.readdirSync(path.join(__dirname))
    .filter((f) => /^(?!index).+\.js$/gi.test(path.parse(f).base))
    .forEach((f) => {
        extensions[path.parse(f).name] = require(path.join(__dirname, f));
    });

module.exports = extensions;