module.exports = {
  config: {
    name: 'help',
    aliases: ['menu', 'commands', 'h'],
    version: '5.2',
    author: '—͟͞͞𝐓𝐀𝐌𝐈𝐌',
    description: 'Show all available commands or detailed info about one command',
    usage: 'help [command name]',
    cooldown: 3,
    role: 0,
    category: 'system'
  },

  async run({ api, event, args, bot, config, logger }) {
    try {
      const { commandLoader } = bot;
      const prefix = config.PREFIX;
      const allCommands = commandLoader.commands;

      const roleNames = {
        0: 'Normal User',
        1: 'Group Admin',
        2: 'Bot Admin',
        3: 'Premium User',
        4: 'Developer'
      };

      const emojiMap = {
        ai: '🤖', 'ai-image': '🎨', group: '👥', system: '⚙️',
        fun: '🎮', owner: '👑', config: '🔧', economy: '💰',
        media: '🎬', tools: '🛠️', utility: '🛠️', info: 'ℹ️',
        image: '🖼️', game: '🎲', admin: '👑', rank: '📊',
        boxchat: '💬', moderation: '🛡️', others: '📦'
      };

      const cleanCategory = (text) => {
        if (!text) return 'others';
        return text.normalize('NFKD').replace(/[^\w\s-]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
      };

      // ── Single Command Detail (Modern & Stylish) ──
      if (args.length > 0) {
        const query = args[0].toLowerCase();
        const cmd = commandLoader.getCommand(query);

        if (!cmd) {
          return api.sendMessage(
            `❌ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 "${query}" 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝.\n\n𝐓𝐲𝐩𝐞 ${prefix}𝐡𝐞𝐥𝐩 𝐭𝐨 𝐬𝐞𝐞 𝐚𝐥𝐥 𝐥𝐢𝐬𝐭.`,
            event.threadId
          );
        }

        const { name, version, author, usage, category, description, aliases, cooldown, role } = cmd.config;
        const roleName = roleNames[role] ?? 'Normal User';
        const usageStr = usage ? usage.replace(/\{pn\}/g, prefix) : `${prefix}${name}`;

        let info = `╭─────────────◊\n`;
        info += `│  ✨ 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐈𝐍𝐅𝐎\n`;
        info += `╰─────────────◊\n\n`;
        info += ` ❐ 𝐍𝐚𝐦𝐞: ${name.toUpperCase()}\n`;
        info += ` ❐ 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: ${version || '1.0'}\n`;
        info += ` ❐ 𝐂𝐚𝐭𝐞𝐠𝐨𝐫𝐲: ${category || 'Uncategorized'}\n`;
        info += ` ❐ 𝐀𝐮𝐭𝐡𝐨𝐫: ${author || 'Unknown'}\n`;
        info += ` ❐ 𝐑𝐨𝐥𝐞: ${roleName}\n`;
        info += ` ❐ 𝐂𝐨𝐨𝐥𝐝𝐨𝐰𝐧: ${cooldown || 0}𝐬\n`;
        info += ` ❐ 𝐀𝐥𝐢𝐚𝐬𝐞𝐬: ${aliases?.length ? aliases.join(', ') : 'None'}\n`;
        info += ` ❐ 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧: ${description || 'No description'}\n\n`;
        info += `──『 𝐔𝐬𝐚𝐠𝐞 』──\n`;
        info += `➜ ${usageStr}\n\n`;
        info += `────────────────`;

        return api.sendMessage(info, event.threadId);
      }

      // ── Full Command List (New Premium Frame) ──
      const categories = {};
      let totalUnique = 0;

      for (const [key, cmd] of allCommands) {
        if (cmd.config.name !== key) continue;
        const cat = cleanCategory(cmd.config.category);
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(cmd.config.name);
        totalUnique++;
      }

      let msg = `╔═══━━━─── • ───━━━═══╗\n`;
      msg += `   ♡—͟͞͞𝐓ꫝ֟፝ؖ۬ᴍɪᴍ_𝙱𝙾𝚃__//⸙🩷🪽\n`;
      msg += `╚═══━━━─── • ───━━━═══╝\n`;
      msg += `▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱\n`;
      msg += ` ➥ 𝗣𝗿𝗲𝗳𝗶𝘅: 『 ${prefix} 』\n`;
      msg += ` ➥ 𝗧𝗼𝘁𝗮𝗹: 『 ${totalUnique} 』𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀\n`;
      msg += `▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱\n`;

      const sortedCats = Object.keys(categories).sort();
      for (const cat of sortedCats) {
        const emoji = emojiMap[cat] || '💠';
        const cmds = categories[cat].sort().map(c => `➤ ${c}`).join('\n');
        
        msg += `\n╭─╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼\n`;
        msg += `│ ${emoji} 🏷️ 𝐂𝐀𝐓𝐄𝐆𝐎𝐑𝐘: ${cat.toUpperCase()}\n`;
        msg += `╰╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼\n`;
        msg += `${cmds}\n`;
      }

      msg += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `💡 𝗨𝘀𝗲: ${prefix}𝗵𝗲𝗹𝐩 [𝗻𝗮𝗺𝗲] 𝗳𝗼𝗿 𝗶𝗻𝗳𝗼\n`;
      msg += `👤 𝐀𝐮𝐭𝐡𝐨𝐫: —͟͞͞𝐓𝐀𝐌𝐈𝐌`;

      return api.sendMessage(msg, event.threadId);

    } catch (error) {
      logger.error('Error in help command', { error: error.message });
      return api.sendMessage('❌ 𝐄𝐫𝐫𝐨𝐫 𝐝𝐢𝐬𝐩𝐥𝐚𝐲𝐢𝐧𝐠 𝐡𝐞𝐥𝐩 𝐢𝐧𝐟𝐨.', event.threadId);
    }
  }
};
