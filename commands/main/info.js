const {MessageEmbed} = require('discord.js')
const config = require('../../config')

module.exports = {
     name: "info",
     aliases: ["inf", "i"],
     cooldown: `${config.infoCooldown}`,
     description: "a command about the bot",
     execute(message, client) {
         const Infembed = new MessageEmbed()
         .setTitle(`${config.BotName} Info`)
         .addField(`Info about the bot`, `Hi! I'm a bot built for moderation and to protect your server \nby ${config.OwnerName}`)
         .addField(`basic Commands`, `The basic commands are: \n\n\`${config.prefix}help\` \n\`${config.prefix}ping\` \n\`${config.prefix}help\``)
         .addField(`Moderation Commmands`, `Coming soon`)
         .addField(`Links:`, `\nSupport Server \n[click](https://discord.gg/8kGW6Jc) \n\nGitHub: \n[coming soon](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`)
         .setColor(config.embedColor)
         .setThumbnail(message.client.user.displayAvatarURL())
         .setTimestamp()
         .setFooter(`${config.BotName}`, `${message.author.displayAvatarURL()}`)
         message.channel.send(Infembed)

        
     }
}