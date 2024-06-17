const { getUser, addUser, updateUser } = require("./database");

// levels.js

const roles = {
  5: "1244723337444458696",
  10: "1244723525554802750",
  15: "1244723637156843540",
  20: "1244723738981695610",
  25: "1244723844644864102",
};

async function handleLeveling(message) {
  let userData = getUser(message.author.id);
  if (!userData) {
    addUser(message.author.id);
    userData = { id: message.author.id, xp: 0, level: 1, total_xp: 0 };
  }

  const xpGain = Math.floor(Math.random() * 21) + 5; // Random XP between 5 and 25
  userData.xp += xpGain;
  userData.total_xp += xpGain;

  console.log(`${message.author.username} gained ${xpGain} XP!`);
  const nextLevelXp = userData.level * 100; // Example level up formula
  if (userData.xp >= nextLevelXp) {
    userData.level += 1;
    userData.xp = userData.xp - nextLevelXp;
    console.log(
      `${message.author.username} leveled up to level ${userData.level}!`
    );
    message.reply(`You leveled up to level ${userData.level}!`);

    const role = roles[userData.level];
    if (role) {
      const guildMember = await message.guild.members.fetch(message.author.id);
      const guildRole = message.guild.roles.cache.get(role);
      if (!guildRole) {
        // Role doesn't exist, create it
        const createdRole = await message.guild.roles.create({
          data: {
            name: `Level ${userData.level}`,
            color: "BLUE", // Customize the role color as needed
          },
        });
        await guildMember.roles.add(createdRole);
      } else {
        // Role exists, add it to the user
        await guildMember.roles.add(guildRole);
      }
    }
  }

  updateUser(message.author.id, userData.xp, userData.level, userData.total_xp);
}

async function getLevel(interaction) {
  let userData = getUser(interaction.user.id);
  if (!userData) {
    addUser(interaction.user.id);
    userData = { id: interaction.user.id, xp: 0, level: 1, total_xp: 0 };
  }

  return `You are level ${userData.level} with ${userData.xp} XP (Total XP: ${userData.total_xp}).`;
}

module.exports = { handleLeveling, getLevel };
