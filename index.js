require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const mineflayer = require('mineflayer');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

let mcBot = null;

client.once('ready', () => {
  console.log(`Discord bot aktif: ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.content === '!baglan') {

    if (mcBot) {
      message.reply("Minecraft bot zaten bağlı!");
      return;
    }

    mcBot = mineflayer.createBot({
      host: process.env.MC_HOST,
      port: parseInt(process.env.MC_PORT),
      username: process.env.MC_USERNAME,
      auth: "offline",
      version: false
    });

    mcBot.on('spawn', () => {
      message.reply("Minecraft sunucuya bağlandım!");
    });

    mcBot.on('error', (err) => {
      console.log(err);
      message.reply("Bağlanırken hata oluştu!");
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
