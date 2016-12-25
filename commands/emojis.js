"use strict";

class Emojis {
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
            if (msg.guild == null) return;
            var emojis = msg.guild.emojis.map((emoji) => {
                return `${emoji.name}:${emoji.id}`;
            });
            this.client.createMessage(msg.channel.id, {
                content: emojis.join(', ')
            }, null).then((msg) => { }, (err) => { });
        };
        return obj;
    }

    get CommandOptions() {
        var obj = {
        };
        obj[this.basename] = { dmOnly: false, guildOnly: true };
        return obj;
    };
}

module.exports = (client) => new Emojis(client);