const fs = require('fs')
const config = require('./config')
const Discord = require('discord.js');
const { timeStamp } = require('console');

const client = new Discord.Client()
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection()

///////////////////[handler thing]//////////////////////////

const folders = fs.readdirSync('./commands');

for (const category of folders) {
    const folder = fs.readdirSync(`./commands/${category}/`).filter(file => file.endsWith(".js"));
    for(const cmdFile of folder) {
        const command = require(`./commands/${category}/${cmdFile}`)
        client.commands.set(command.name, command);
    }
}

const prefix = config.prefix

client.on('message', message => {
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if (!command) return;

     ////////////////////////[cooldown handler]//////////////////////////////

     if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirtationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirtationTime) {
            const timeLeft = (expirtationTime - now) / 1000;
            return message.reply(`wait \`${timeLeft.toFixed(1)}\` to use \`${command.name}\` again!`)
        }
    }

    timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    try{
        command.execute(message,args)
    } catch (error) {
        console.log(error)
        message.channel.send(`there was a error: \n\`\`\`js\n${error}\n\`\`\``)
    }
})

client.on('ready', () => {
    console.log('ready');
})

client.login(config.token)