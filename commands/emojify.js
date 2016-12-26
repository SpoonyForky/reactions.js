"use strict";

const path = require('path');
const extensions = require(path.join(__dirname, '..', 'extensions'));
const db = require(path.join(__dirname, '..', 'models'));

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
            db.models.Keyword.findAll({
                include: [{
                    model: db.models.Emoji
                }]
            }).then((keywords) => {
                var emojis = keywords.map((keyword) => ({
                    name: keyword.get('Name'),
                    regex: keyword.get('Regex'),
                    emojis: keyword.get('Emojis')
                        .map((emoji) => ({
                            name: emoji.get('Name'),
                            code: emoji.get('Code')
                        }))
                })).filter((keyword) => extensions.regex(keyword.regex).test(msg.content))
                    .map((keyword) => keyword.emojis)
                    .flatten
                    .filter((emoji) => {
                        if (/^\:[\w]+\:[\d]+$/gi.test(emoji.code)) {
                            return msg.guild.emojis
                                .map((availEmoji) => ({ name: availEmoji.name, code: `:${availEmoji.name}:${availEmoji.id}` }))
                                .some((availEmoji) => availEmoji.code == emoji.code);
                        }
                        return true;
                    })
                    .map((emoji) => emoji.code)
                    .join('');

                this.client.createMessage(msg.channel.id, {
                    content: emojis.replace(/(\:[\w]+\:[\d]+)/gi, (match, group1) => `<${group1}>`)
                }, null).then((msg) => { }, (err) => { });
            }, (err) => { });
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
