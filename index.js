//made by Jack Kalina 2018-2019
//shoutouts to simpleflips
const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const id = require("./id.json");
const fs = require("fs");
const opus = require("node-opus");
const bot = new Discord.Client({disableEveryone: true})
const RichEmbed = require('discord.js');
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) =>{
   if(err) console.log(err);
   let jsfile = files.filter(f => f.split(".").pop() === "js")
   if(jsfile.length <= 0){
     console.log("Couldn't find commands.")
     return;
   }
   jsfile.forEach((f, i) =>{
     let props = require(`./commands/${f}`);
     console.log(`Command ${f} loaded`);
     bot.commands.set(props.help.name, props);
   });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`) // bot is online
  bot.user.setActivity("Kanye West", {type: 'LISTENING'}); // set game its in
});

bot.on("message", async message => {
  if(message.author.bot) return; // if a bot sent the message ignore
  if(message.channel.type === "dm") return; // if the msg is in a dm ignore
  if(message.content.indexOf(botconfig.prefix) !== 0) return; // if the first letter isn't the prefix ignore
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
});

bot.login(id.token);
