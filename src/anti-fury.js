const database = require("../services/databaseService.js");
const db = database;
module.exports = function antiFury(client) {
  client.on("messageCreate", (message) => {
    const InputMessage = message.content;
    const references = db.prepare("SELECT * FROM fury_references").all();
    const searchString = references.map((reference) => reference.reference);

    
    if (InputMessage.includes(searchString)) {
      message.reply("Fury Detected! You have been muted for 30 minutes.");
      try {
        message.member.roles.add("1243259426312421416");
        setTimeout(() => {
          message.member.roles.remove("1243259426312421416");
        }, 1800000);
      } catch (error) {
        console.error(error);
      }
    }
  });
};
