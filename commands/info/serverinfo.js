const d = require('discord.js');

module.exports = {
    name: "serverinfo",
    description: "Gets information on a guild.",
    aliases: ["si", "server", "server-info", "gi", "guild", "guildinfo", "guild-info"],
    async execute(message) {
        let verif;
        if (message.guild.verificationLevel === 'DISABLED') {
            verif = "None"
        } else if (message.guild.verificationLevel === 'ALL_MEMBERS') {
            verif = "All Members"
        } else if (message.guild.verificationLevel === "MEMBERS_WITHOUT_ROLES") {
            verif = "Members Without Roles"
        };

        const em = new d.MessageEmbed()
        .setAuthor(`Info: ${message.guild.name}`, `${message.guild.iconURL({dynamic:true,format:"png"})}`)
        .addFields(
            {
                name: "ID", value: `\`${message.guild.id}\``, inline: true,
            },
            {
                name: "Creation Date", value: `${message.guild.createdAt}`, inline: true
            }
        )
        message.channel.send(em)
    }
}