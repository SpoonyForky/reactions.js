"use strict";

const path = require('path');
const fs = require('fs');
const sequelize = require('sequelize');
const config = require(path.join(__dirname, 'config.json'));
const db = new sequelize(`${config.Driver}://${config.Username}:${config.Password}@${config.Host}:${config.Port}/${config.Database}`, {
    logging: false
});

const models = {};

fs.readdirSync(path.join(__dirname))
    .filter((f) => /^(?!index).+\.js$/gi.test(path.parse(f).base))
    .map((f) => {
        var model = db.import(path.join(__dirname, f));
        models[model.name] = model;
    });

Object.keys(models).forEach((m) => {
    if ("associate" in models[m]) {
        models[m].associate(models);
    }
});

module.exports = db;