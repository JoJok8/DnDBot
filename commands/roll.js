const Discord = require('discord.js');
const client = new Discord.Client();

module.exports.run = async (bot,message,args) => {
  if (!message.guild) return;
  function rollNumber(die) {
    return (Math.floor(Math.random()*die) + 1);
  };
  let lCMessage = message.content.toLowerCase().substring(6);
  let splitString = lCMessage.split(" ");
  let character = splitString[0];
  let stat = splitString[1];
  let advYN = splitString[2];
  const charJson = require(`../characters/${character}.json`);
  let statBonus = charJson[stat];
  let initialRoll = rollNumber(20);
  let addedRoll = initialRoll + statBonus;
  function uppercaseString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  if (advYN == undefined) {
    return;
    const result = new Discord.RichEmbed()
    .setColor('#'+Math.floor(Math.random()*16777215).toString(16))
    .setTitle(`${message.author.username}'s roll'`)
    .setThumbnail("https://cdn.shopify.com/s/files/1/1066/8352/products/metal-dice-single-d20-gold-color-with-black-numbers-metal-die-1_750x.jpg?v=1540309629")
    .setDescription(`Roll for character: ${uppercaseString(character)}`)
    .addField(`Initial roll: ${initialRoll}`)
    .addField(`Roll with stat bonus: ${addedRoll}`);
    message.channel.send(result);
  } else if (advYN.search("disadvantage") == -1) {
    let secondRoll = rollNumber(20);
    let secondRollAdded = secondRoll + statBonus;
    if (secondRollAdded < addedRoll) {
      let finalRoll = addedRoll;
    } else if (addedRoll < secondRollAdded) {
      let finalRoll = secondRollAdded;
    } else {
      let finalRoll = addedRoll;
    };
    console.log("got to result");
    const result = new Discord.RichEmbed()
    .setColor('#'+Math.floor(Math.random()*16777215).toString(16))
    .setTitle(`${message.author.username}'s roll with advantage`)
    .setThumbnail("https://cdn.shopify.com/s/files/1/1066/8352/products/metal-dice-single-d20-gold-color-with-black-numbers-metal-die-1_750x.jpg?v=1540309629")
    .addField(`Roll for character: ${character}`,`Stat rolled for: ${stat}\nStat bonus for ${stat}: ${statBonus}\nInitial roll: ${initialRoll}\nRoll with stat bonus: ${addedRoll}\nSecond roll: ${secondRoll}\nSecond roll with stat bonus: ${secondRollAdded}\nFinal roll: ${finalRoll}`);
    console.log("got to send");
    message.channel.send(result);
  } else {
    let secondRoll = rollNumber(20);
    let secondRollAdded = secondRoll + statBonus;
  };
}

module.exports.help = {
  name: "roll"
}
