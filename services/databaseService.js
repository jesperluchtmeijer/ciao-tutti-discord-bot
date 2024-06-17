const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "../database.db"), {
  fileMustExist: false,
});

const tables = {
  furry_references:
    "id TEXT PRIMARY KEY, reference TEXT, usages INTEGER, author TEXT",
  quotes:
    "id TEXT PRIMARY KEY, quote TEXT, reporter TEXT, speaker TEXT, date DATE",
  users:
    "id TEXT PRIMARY KEY, xp INTEGER, level INTEGER, total_xp INTEGER, username TEXT",
};

for (let tableName in tables) {
  const tableExists = db
    .prepare(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`
    )
    .get();
  if (!tableExists) {
    db.prepare(`CREATE TABLE ${tableName} (${tables[tableName]});`).run();
  }
}

module.exports = db;
