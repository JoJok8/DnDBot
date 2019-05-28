const Discord = require('discord.js');
const client = new Discord.Client();

module.exports.run = async (bot,message,args) => {
  if (!message.guild) return;
  let lCMessage = message.content.toLowerCase().substring(6);
  const dPosition = lCMessage.search("d");
  function rollNumber(die) {
    return (Math.floor(Math.random()*die) + 1);
  };
  if (dPosition === -1) {
    message.reply("please format your roll in the form xdy.");
  } else {
    let processed = lCMessage.replace(' ', '1');
    let numRolls = Number(processed.substring(0,dPosition));
    if (processed.substring(0,dPosition) === "") {
      numRolls = 1;
    };
    let numDie = Number(processed.substring(dPosition + 1));
    let rollArray = [];
    let roll = 0;
    for (var i = 0; i < numRolls; i++) {
      rollArray.push(rollNumber(numDie));
    };
    for (var i = 0; i < rollArray.length; i++) {
      roll += rollArray[i];
    };
    console.log(`User ${message.author.username} rolled ${processed} in ${message.guild.name} and got ${roll}`);
    if (numRolls != 1){
    message.channel.send(`You rolled ${roll}. Your individual rolls were ${rollArray}.`);
    } else {
    message.channel.send(`You rolled ${roll}.`);
    };
  };
}

module.exports.help = {
  name: "roll"
} 
