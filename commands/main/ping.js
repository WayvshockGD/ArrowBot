const config = require('../../config')

module.exports = {
    name: "ping",
    description: "Pings the bot",
    cooldown: `${config.infoCooldown}`,
    async execute(message, args) {
        let msgPing = Date.now() - message.createdTimestamp;
        let apiPing = Math.round(message.client.ws.ping)

        const m = await message.channel.send("Ping...");
        m.edit(`Pong! Message Latency: \`\`\`yaml\n${msgPing} ms\`\`\` \n API Latency: \`\`\`yaml\n${apiPing} ms\`\`\``);
    }
}