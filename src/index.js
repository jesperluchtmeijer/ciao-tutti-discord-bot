require("dotenv").config();
const {
  Client,
  IntentsBitField,
  ActivityType,
  REST,
  Routes,
} = require("discord.js");
const antiFurry = require("./anti-furry");
const antiFurryReference = require("../commands/addFurryReference");
const addQuote = require("../commands/addQuote");
const quote = require("../commands/quote");
const { handleLeveling, getLevel } = require("./levels");
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

let status = [
  {
    name: "A cool stream!",
    type: ActivityType.Streaming,
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    name: "Watching you!",
  },
  {
    name: "GTA VI trailer!",
    type: ActivityType.Watching,
  },
  {
    name: "your mom!",
    type: ActivityType.Listening,
  },
];

module.exports = client;

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
  // setInterval(() => {
  //   let random = Math.floor(Math.random() * status.length);
  //   client.user.setActivity(status[random]);
  //   console.log(`Status: ${status[random].name}`);
  // }, 100000);
  antiFurry(client);
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
    antiFurryReference(referenceObject);
    interaction.reply(`Reference: ${reference} added!`);
  }
  if (interaction.commandName === "add-quote") {
    const quote = interaction.options.getString("quote");
    const author = interaction.options.getString("author");
    const reporter = interaction.user;
    const quoteObject = { quote: quote, author: author, reporter: reporter };
    addQuote(quoteObject);
    interaction.reply(`Quote: ${quote} added!`);
  }
  if (interaction.commandName === "quote") {
    const randomQuote = quote(client);
    console.log(randomQuote);
    interaction.reply(
      `Quote: ${randomQuote.quote} - ${randomQuote.speaker} - ${randomQuote.date}`
    );
  }
  if (interaction.commandName === "level") {
    const levelMessage = await getLevel(interaction);
    interaction.reply(levelMessage);
  }
});

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }
  handleLeveling(message);
});

client.login(process.env.TOKEN);
