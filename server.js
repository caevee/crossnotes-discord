const axios = require("axios");
const Discord = require('discord.js');
const client = new Discord.Client();
const secret = require("./secrets");


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === '!list') {
        axios.get("https://crossnotes-api.herokuapp.com/notes")
            .then(function (response) {
                let reply = "";
                for (let i = 0; i < response.data.length; i++) {
                    reply += `**Note ${i + 1}**\nID:${response.data[i].id}\nTitle: ${response.data[i].title}\nContent: ${response.data[i].content}\n\n`;
                }
                msg.channel.send(reply);
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });
    }
});

client.login(secret);
