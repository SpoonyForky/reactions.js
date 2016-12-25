"use strict";

const path = require('path');
const fs = require('fs');

module.exports = (client) => fs.readdirSync(path.join(__dirname))
    .filter((f) => /^(?!index).+\.js$/gi.test(path.parse(f).base))
    .map((f) => require(path.join(__dirname, f))(client));