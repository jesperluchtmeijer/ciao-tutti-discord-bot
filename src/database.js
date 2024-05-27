const db = require("../services/databaseService.js");

function getUser(id) {
  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  return stmt.get(id);
}

function addUser(id) {
  const stmt = db.prepare("INSERT INTO users (id) VALUES (?)");
  return stmt.run(id);
}

function updateUser(id, xp, level, total_xp) {
  const stmt = db.prepare(
    "UPDATE users SET xp = ?, level = ?, total_xp = ? WHERE id = ?"
  );
  return stmt.run(xp, level, total_xp, id);
}

module.exports = { getUser, addUser, updateUser };
