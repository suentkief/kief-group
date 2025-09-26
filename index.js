// index.js
const Eris = require("eris");
const { joinVoiceChannel } = require("@discordjs/voice");
const startServer = require("./keep_alive.js");

// Inicia servidor HTTP para manter vivo
startServer();

// ID do servidor
const GUILD_ID = process.env.GUILD_ID;

// Lista de canais de voz (3 canais, pois você tem 15 tokens = 5 bots por canal)
const VOICE_CHANNELS = [
  process.env.CHANNEL1,
  process.env.CHANNEL2,
  process.env.CHANNEL3,
];

// Lista de tokens (15 bots)
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

const bots = [];

tokens.forEach((token, index) => {
  if (!token) {
    console.error(`❌ Token ${index + 1} não definido.`);
    return;
  }

  const bot = new Eris(token, {
    intents: ["guilds", "guildVoiceStates"],
  });

  bot.on("ready", () => {
    console.log(`✅ Bot ${index + 1} logado como ${bot.user.username}`);

    // Calcula em qual canal de voz o bot vai entrar
    const channelIndex = Math.floor(index / 5); // 5 bots por canal
    const channelId = VOICE_CHANNELS[channelIndex % VOICE_CHANNELS.length];

    try {
      joinVoiceChannel({
        channelId: channelId,
        guildId: GUILD_ID,
        adapterCreator: bot.guilds.get(GUILD_ID).voiceAdapterCreator,
        selfDeaf: true,
        selfMute: true,
      });

      console.log(`🎤 Bot ${index + 1} entrou no canal ${channelId}`);
    } catch (err) {
      console.error(`❌ Erro ao conectar bot ${index + 1} na call:`, err);
    }
  });

  bot.on("error", (err) => {
    console.error(`Erro no bot ${index + 1}:`, err);
  });

  bot.connect();
  bots.push(bot);
});
