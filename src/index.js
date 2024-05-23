require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const antiFury = require("./anti-fury");
const antiFuryReference = require("../commands/addFuryReference");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

module.exports = client;

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
  antiFury(client);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }
  if (interaction.commandName === "add-reference") {
    const reference = interaction.options.getString("reference");
    const user = interaction.user;
    console.log(reference);
    referenceObject = { reference: reference, user: user };
    antiFuryReference(referenceObject);
    interaction.reply(`Reference: ${reference} added!`);
  }
});

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === "hello") {
    message.reply("hello");
  }
});

client.login(process.env.TOKEN);
