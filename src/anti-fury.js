const database = require("../services/databaseService.js");
const db = database;

module.exports = function antiFury(client) {
  client.on("messageCreate", (message) => {
    console.log("anti-fury is running");
    const inputMessage = message.content;
    const references = db.prepare("SELECT * FROM fury_references").all();
    console.log(references);
    const searchStrings = references.map((reference) => reference.reference);
    console.log(searchStrings);

    const isFuryDetected = searchStrings.some((reference) =>
      inputMessage.includes(reference)
    );

    if (isFuryDetected) {
      message.reply("Fury Detected! You have been muted for 30 minutes.");
      try {
        const muteRole = "1243259426312421416";
        message.member.roles.add(muteRole);
        setTimeout(() => {
          message.member.roles.remove(muteRole);
        }, 1800000); // 30 minutes in milliseconds = 1800000
      } catch (error) {
        console.error(error);
      }
    }
  });
};
