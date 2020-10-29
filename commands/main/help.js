const {MessageEmbed} = require('discord.js')
const config = require('../../config')

module.exports = {
     name: "help",
     aliases: ["h"],
     cooldown: `${config.infoCooldown}`,
     description: "a command about the commands",
     execute(message) {
         const Help = new MessageEmbed()
         .setTitle(`${config.BotName} Help`)
         .setDescription(`\`<> = required\` \`[] = optional\``)
         .addField(`Info Commands:`, `\`\`\`${config.prefix}info, ${config.prefix}ping\`\`\``)
         .setColor(config.embedColor)
         .setTimestamp()
         .setFooter(`${config.BotName}`, `${message.author.displayAvatarURL()}`)
         message.channel.send(Help)
     }
}