const database = require("../services/databaseService.js");
const { v4: uuid } = require("uuid");
const db = database;

module.exports = function antiFuryReference(client) {
  console.log("anti-fury is running");
  console.log(client.user.id);

  const referenceExists = db
    .prepare("SELECT * FROM fury_references WHERE reference = ?")
    .get(client.reference);

  if (referenceExists) {
    console.log("Reference already exists.");
    return;
  }

  const id = uuid();
  const reference = client.reference;
  const referenceLower = reference.toLowerCase();
  const usages = 0;
  const author = client.user.id;

  db.prepare(
    "INSERT INTO fury_references (id, reference, usages, author) VALUES (?, ?, ?, ?)"
  ).run(id, referenceLower, usages, author);
  console.log("Reference added!");
  return;
};
