const database = require("../services/databaseService.js");
const { v4: uuid } = require("uuid");
const db = database;

module.exports = function addQuote(client) {
  console.log("addQuote is running");

  const quoteExists = db
    .prepare("SELECT * FROM quotes WHERE quote = ?")
    .get(client.quote);

  if (quoteExists) {
    console.log("Quote already exists.");
    return;
  }

  const id = uuid();
  const quote = client.quote;
  const author = client.author;
  const reporter = client.reporter.username;
  const date = new Date();
  const formattedDate =
    ("0" + date.getDate()).slice(-2) +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    date.getFullYear();
  console.log(formattedDate);
  console.log(reporter);

  db.prepare(
    "INSERT INTO quotes (id, quote, speaker, reporter, date) VALUES (?, ?, ?, ?, ?)"
  ).run(id, quote, author, reporter, formattedDate);
  console.log("Quote added!");
  return;
};
