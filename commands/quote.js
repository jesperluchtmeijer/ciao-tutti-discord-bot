const database = require("../services/databaseService.js");
const db = database;
const { v4: uuid } = require("uuid");

module.exports = function getRandomQuote(client) {
  const quotes = db.prepare("SELECT * FROM quotes").all();
  const random = Math.floor(Math.random() * quotes.length);
  const quote = quotes[random];
  return quote;
};
