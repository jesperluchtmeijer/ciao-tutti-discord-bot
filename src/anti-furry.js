const database = require("../services/databaseService.js");
const db = database;

module.exports = function antiFurry(client) {
  client.on("messageCreate", (message) => {
    console.log("anti-furry is running");
    const inputMessage = message.content;
    const references = db.prepare("SELECT * FROM furry_references").all();
    console.log(references);
    const searchStrings = references.map((reference) => reference.reference);
    console.log(searchStrings);

    const isFurryDetected = searchStrings.some((reference) =>
      inputMessage.includes(reference)
    );

    if (isFurryDetected) {
      message.reply("Furry Detected! You have been muted for 30 minutes.");
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
