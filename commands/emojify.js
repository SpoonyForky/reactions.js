"use strict";

const request = require('request');

class Emojify {
    constructor(client) {
        this.client = client;
        this.basename = this.constructor.name.toLowerCase();

        this.basecommand = this.client.registerCommand(this.basename, this.Commands[this.basename], this.CommandOptions[this.basename]);
        this.subcommands = Object.keys(this.Commands).filter((scmd) => scmd != this.basename).map((scmd) => this.basecommand.registerSubcommand(scmd, this.Commands[scmd], this.CommandOptions[scmd]));
    }

    get Commands() {
        var obj = {
        };
        obj[this.basename] = (msg, args) => {
            request({
                url: 'https://reactions.blakerandall.xyz/api/ReplaceKeywords',
                method: 'POST',
                form: {
                    KeywordReplace: args
                }
            }, (err, httpResponse, body) => {
                var emojis = JSON.parse(body).join(' ');
                this.client.createMessage(msg.channel.id, {
                    content: emojis.replace(/(\:[\w]+\:[\d]+)/gi, (match, group1) => `<${group1}>`)
                }, null).then((msg) => { }, (err) => { });
            });
        };
        return obj;
    }

    get CommandOptions() {
        var obj = {
        };
        obj[this.basename] = { argsRequired: true };
        return obj;
    };
}

module.exports = (_CLIENT) => new Emojify(_CLIENT);