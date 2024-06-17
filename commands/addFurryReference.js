const database = require("../services/databaseService.js");
const { v4: uuid } = require("uuid");
const db = database;

module.exports = function antiFurryReference(client) {
  console.log("anti-furry is running");
  console.log(client.user.id);

  const referenceExists = db
    .prepare("SELECT * FROM furry_references WHERE reference = ?")
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
    "INSERT INTO furry_references (id, reference, usages, author) VALUES (?, ?, ?, ?)"
  ).run(id, referenceLower, usages, author);
  console.log("Reference added!");
  return;
};
