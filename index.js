const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const startServer = require('./keep_alive');

// Inicia servidor HTTP para manter vivo
startServer();

// IDs dos canais de voz
const VOICE_CHANNELS = [
  process.env.CHANNEL1,
  process.env.CHANNEL2,
  process.env.CHANNEL3,
];

// Lista de tokens
const tokens = [
  process.env.TOKEN1,
  process.env.TOKEN2,
  process.env.TOKEN3,
  process.env.TOKEN4,
  process.env.TOKEN5,
  process.env.TOKEN6,
  process.env.TOKEN7,
  process.env.TOKEN8,
  process.env.TOKEN9,
  process.env.TOKEN10,
  process.env.TOKEN11,
  process.env.TOKEN12,
  process.env.TOKEN13,
  process.env.TOKEN14,
  process.env.TOKEN15,
];

tokens.forEach((token, index) => {
  if (!token) {
    console.error(`❌ Token ${index + 1} não definido.`);
    return;
  }

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildVoiceStates
    ]
  });

  client.once('ready', () => {
    console.log(`✅ Bot ${index + 1} logado como ${client.user.tag}`);

    // Calcula o canal para o bot entrar (5 bots por canal)
    const channelIndex = Math.floor(index / 5);
    const channelId = VOICE_CHANNELS[channelIndex % VOICE_CHANNELS.length];

    try {
      joinVoiceChannel({
        channelId: channelId,
        guildId: process.env.GUILD_ID,
        adapterCreator: client.guilds.cache.get(process.env.GUILD_ID).voiceAdapterCreator,
        selfDeaf: true,
        selfMute: true,
      });

      console.log(`🎤 Bot ${index + 1} entrou no canal ${channelId}`);
    } catch (err) {
      console.error(`❌ Erro ao conectar bot ${index + 1}:`, err);
    }
  });

  client.on('error', (err) => {
    console.error(`Erro no bot ${index + 1}:`, err);
  });

  client.login(token);
});
