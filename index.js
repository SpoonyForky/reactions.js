"use strict";
const path = require('path');
const fs = require('fs');
const request = require('request');
const extensions = require(path.join(__dirname, 'extensions'));
const config = require(path.join(__dirname, 'config.json'));
const db = require(path.join(__dirname, 'models'));
const erisapi = require("eris");
const client = new erisapi.CommandClient(config.Token, {}, {
	defaultHelpCommand: true,
	description: 'Advanced Automated Reaction Bot',
	ignoreBots: true,
	ignoreSelf: true,
	name: config.Nickname,
	owner: config.Owner,
	prefix: config.CommandPrefix,
	defaultCommandOptions: {
		caseInsensitive: true,
		deleteCommand: true,
		argsRequired: false,
		guildOnly: false,
		dmOnly: false,
		description: 'No description',
		fullDescription: 'No full description',
		usage: '',
		requirements: {
			userIDs: [
				config.OwnerId
			],
			permissions: {
				"administrator": true
			},
			roleIDs: [
			],
			roleNames: [
				'reactions'
			]
		},
		cooldown: 2000,
		cooldownMessage: 'Cooldown hit!',
		permissionMessage: 'Insufficient Permissions'
	}
});
const commands = require(path.join(__dirname, 'commands'))(client);

function _ReactionToMessage(msg) {
	request({
		url: 'https://reactions.blakerandall.xyz/api/SearchKeywords',
		method: 'POST',
		form: {
			KeywordSearch: msg.content
		}
	}, function (err, httpResponse, body) {
		var keywords = JSON.parse(body);
		keywords.forEach((k) => {
			var emojis = k.emojis;
			emojis.forEach((e) => {
				client.addMessageReaction(msg.channel.id, msg.id, e.code).then((msg) => { }, (err) => { });
			});
		});
	});
}

client.on('ready', () => {
	client.guilds.forEach((guild) => {
		client.editNickname(guild.id, config.Nickname).then((success) => { }, (err) => { });
	});
});

client.on('connect', () => {
});

client.on('reconnecting', () => {
});

client.on('disconnect', () => {
});

client.on('guildMemberUpdate', (guild, member, oldMember) => {
	if (member.user == client.user) {
		client.editNickname(guild.id, config.Nickname).then((success) => { }, (err) => { });
	}
});

client.on('messageCreate', (msg) => {
	if (msg.author != client.user) {
		_ReactionToMessage(msg);
	}
});

client.on('messageUpdate', (newMsg, oldMsg) => {
	if (oldMsg.author != client.user && newMsg.author != client.user) {
		_ReactionToMessage(newMsg);
	}
});

client.on('messageDelete', (msg) => {
	if (msg.author != client.user) {

	}
});

client.on('messageReactionAdd', (msg, emoji, userid) => {
	if (msg.author != client.user) {
		client.addMessageReaction(msg.channel.id, msg.id, emoji.name).then((msg) => { }, (err) => { });
	}
});

client.on('messageReactionRemove', (msg, emoji, userid) => {
	if (msg.author != client.user) {
		client.removeMessageReaction(msg.channel.id, msg.id, emoji.name).then((msg) => { }, (err) => { });
	}
});

process.on('SIGINT', function () {
	client.disconnect({ reconnect: false });
});

client.connect();