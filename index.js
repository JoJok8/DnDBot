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
  if(message.content.toLowerCase().search("bruh") != -1){ // if the message is bruh... its a bruh moment
    console.log(`Detected a bruh moment from ${message.author.username} in ${message.guild.name}`);
    const embed = new Discord.RichEmbed()
    .setTitle('Bruh Moment')
    .setColor(0xFF0000)
    .setDescription('This is a certified Bruh Moment')
    .setThumbnail('https://images-na.ssl-images-amazon.com/images/I/61DZ%2BTGtxuL._SY355_.png');
    message.channel.send(embed);
  };
  if(message.content.toLowerCase().search("n word") != -1){
    console.log(`${message.author.username} in ${message.guild.name} is about to say the n word`);
    const embed = new Discord.RichEmbed()
    .setTitle(":rotating_light: N WORD ALERT :rotating_light:")
    .setColor(0xFF0000)
    .setDescription("AVERT YOUR EYES, SOMEONE'S GOING TO SAY THE N WORD")
    .setThumbnail("http://m.jumpstart.com/JumpstartNew/brands/pom/img/characters/pom-skipper03.png");
    message.channel.send(embed);
  };
  if(message.content.toLowerCase().search("crazy frog") != -1) {
    console.log(`${message.author.username} in ${message.guild.name} summoned Crazy Frog`);
    const embed = new Discord.RichEmbed()
    .setTitle("Bing Bing")
    .setColor(0x0066cc)
    .setDescription("Ring ding ding ding ding \nA Ring Ding Ding Dingdemgdemg \nA ring ding ding ding ding")
    .setThumbnail("https://pbs.twimg.com/profile_images/811818780342947840/8bB3lP90_400x400.jpg");
    message.channel.send(embed);
  };
  if(message.content.toLowerCase().search("gn") != -1){
    console.log(`Saying gn to ${message.author.username} in ${message.guild.name}`);
    message.channel.send("gn");
  };
  if(message.content.toLowerCase().search("cheese") != -1) {
    console.log(`${message.author.username} has some cheese in ${message.guild.name}`);
    message.channel.send(":mouse2: ᶦ ˢᵐᵉᵉˡ ᶜʰᵉᵉˢᵉ");
  };
  if(message.content.toLowerCase().search("furr") != -1) {
    console.log(`${message.author.username} mentioned furries in ${message.guild.name}`);
    message.delete();
    message.reply("NO FURRIES");
  };
  if(message.content.toLowerCase().search("yeehaw") != -1 || message.content.toLowerCase().search("yee haw") != -1) {
    console.log(`Detected a Yee Haw Moment from ${message.author.username} in ${message.guild.name}`);
    message.channel.send({files:["D:/Discord Bot/av/Crabulite.png"]});
  };
  if(message.content.indexOf("30") == 0){
    if (!message.guild) return; // if voice isnt in a server ignore
    if (message.member.voiceChannel) {
      const voiceChannel = message.member.voiceChannel;
      voiceChannel.join().then(connection =>{
        console.log(`Wololoing for ${message.author.username} in ${message.guild.name}`);
        const dispatcher = connection.playFile('D:/Discord Bot/av/Wololo.mp3');
        dispatcher.on("end", end => {
          console.log(`Wololoed for ${message.author.username} in ${message.guild.name}`)
          voiceChannel.leave();
        })
      })
      };
  };
  if(message.content.indexOf(botconfig.prefix) !== 0) return; // if the first letter isn't the prefix ignore

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
});

bot.login(id.token);
