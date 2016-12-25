"use strict";

class Id {
    constructor(client) {
        this.client = client;
        this.basename = this.constructor.name.toLowerCase();

        this.basecommand = this.client.registerCommand(this.basename, this.Commands[this.basename], this.CommandOptions[this.basename]);
        this.subcommands = Object.keys(this.Commands).filter((scmd) => scmd !== this.basename).map((scmd) => this.basecommand.registerSubcommand(scmd, this.Commands[scmd], this.CommandOptions[scmd]));
    }

    get Commands() {
        var obj = {
            me: (msg, args) => {
                this.client.createMessage(msg.channel.id, {
                    content: `${msg.author.username}: ${msg.author.id}`
                }, null).then((msg) => { }, (err) => { });
            },
            channel: (msg, args) => {
                this.client.createMessage(msg.channel.id, {
                    content: `Channel: ${msg.channel.id}`
                }, null).then((msg) => { }, (err) => { });
            },
            guild: (msg, args) => {
                this.client.createMessage(msg.channel.id, {
                    content: `Guild: ${msg.guild.id}`
                }, null).then((msg) => { }, (err) => { });
            },
        };
        obj[this.basename] = (msg, args) => {
            this.client.createMessage(msg.channel.id, {
                content: `${msg.author.username}: ${msg.author.id}`
            }, null).then((msg) => { }, (err) => { });
        };
        return obj;
    }

    get CommandOptions() {
        var obj = {
            me: { dmOnly: false, guildOnly: false },
            channel: { dmOnly: false, guildOnly: true },
            guild: { dmOnly: false, guildOnly: true },
        };
        obj[this.basename] = {};
        return obj;
    };
}

module.exports = (client) => new Id(client);