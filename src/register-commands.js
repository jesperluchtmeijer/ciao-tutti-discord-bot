require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");
const { name } = require("../services/databaseService");

const commands = [
  {
    name: "add-reference",
    description: "Add a furry reference for the anti-furry tracker",
    options: [
      {
        name: "reference",
        type: ApplicationCommandOptionType.String,
        description: "The reference to add",
        required: true,
      },
    ],
  },
  {
    name: "add-quote",
    description: "Add a quote to the quote book",
    options: [
      {
        name: "quote",
        type: ApplicationCommandOptionType.String,
        description: "The quote",
        required: true,
      },
      {
        name: "author",
        type: ApplicationCommandOptionType.String,
        description: "Who said the quote",
        required: true,
      },
    ],
  },
  {
    name: "quote",
    description: "Get a random quote",
  },
  {
    name: "level",
    description: "Check your level and XP.",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Slash commands were registered successfully!");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
