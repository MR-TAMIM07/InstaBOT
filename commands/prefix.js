module.exports = {
  config: {
    name: 'prefix',
    aliases: ['setprefix', 'changeprefix'],
    version: '1.6.0',
    author: '—͟͞͞𝐓𝐀𝐌𝐈𝐌',
    role: 0,
    cooldown: 5,
    category: 'config',
    description: 'Change the bot prefix for your chat or globally (admin only)',
    usage: 'prefix [new prefix] [-g] | prefix reset | prefix'
  },

  async run({ api, event, args, bot, logger, database, config, PermissionManager, ConfigManager }) {
    const { threadId, senderID, body } = event;
    const currentPrefix = config.PREFIX;

    try {
      // Stylish Header Frame
      const header = `╭─────────────◊\n│  ✨ 𝐏𝐑𝐄𝐅𝐈𝐗 𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒\n╰─────────────◊\n\n`;

      // Logical Fix: Jodi user shudhu prefix ba 'prefix' lekhe
      if (!args[0] || args.length === 0) {
        let msg = header;
        msg += ` ❐ 𝐂𝐮𝐫𝐫𝐞𝐧𝐭 𝐏𝐫𝐞𝐟𝐢𝐱: 『 ${currentPrefix} 』\n\n`;
        msg += `──『 𝐔𝐬𝐚𝐠𝐞 』──\n`;
        msg += `➤ ${currentPrefix}prefix <new> - For this chat\n`;
        msg += `➤ ${currentPrefix}prefix reset - Reset to default\n`;
        msg += `➤ ${currentPrefix}prefix <new> -g - Global (Admin)\n\n`;
        msg += `💡 𝐓𝐢𝐩: Type "prefix" to see current info.\n`;
        msg += `────────────────\n`;
        msg += `👤 𝐀𝐮𝐭𝐡𝐨𝐫: —͟͞͞𝐓𝐀𝐌𝐈𝐌`;
        
        return api.sendMessage(msg, threadId);
      }

      // Handle reset logic
      if (args[0].toLowerCase() === 'reset') {
        database.setThreadData(threadId, { prefix: null });
        let msg = `╭─────────────◊\n│  ✅ 𝐏𝐑𝐄𝐅𝐈𝐗 𝐑𝐄𝐒𝐄𝐓\n╰─────────────◊\n\n❐ Chat prefix reset to: 『 ${currentPrefix} 』`;
        return api.sendMessage(msg, threadId);
      }

      const newPrefix = args[0];
      const isGlobal = args[1] === '-g' || args[1] === '--global';

      if (newPrefix.length > 5 || newPrefix.includes(' ')) {
        return api.sendMessage('❌ 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐩𝐫𝐞𝐟𝐢𝐱 (𝐦𝐚𝐱 𝟓 𝐜𝐡𝐚𝐫𝐬, 𝐧𝐨 𝐬𝐩𝐚𝐜𝐞𝐬)!', threadId);
      }

      if (isGlobal) {
        const isAdmin = await PermissionManager.hasPermission(senderID, 2);
        if (!isAdmin) return api.sendMessage('❌ 𝐀𝐝𝐦𝐢𝐧 𝐨𝐧𝐥𝐲 𝐜𝐨𝐦𝐦𝐚𝐧𝐝!', threadId);

        ConfigManager.updateConfig('PREFIX', newPrefix);
        let msg = `╭─────────────◊\n│  🌍 𝐆𝐋𝐎𝐁𝐀𝐋 𝐏𝐑𝐄𝐅𝐈𝐗\n╰─────────────◊\n\n✅ Global prefix: 『 ${newPrefix} 』`;
        return api.sendMessage(msg, threadId);
      }

      // Thread Specific Prefix
      const threadData = database.getThreadData(threadId) || {};
      threadData.prefix = newPrefix;
      database.setThreadData(threadId, threadData);

      let msg = `╭─────────────◊\n│  ✅ 𝐏𝐑𝐄𝐅𝐈𝐗 𝐂𝐇𝐀𝐍𝐆𝐄𝐃\n╰─────────────◊\n\n❐ New chat prefix: 『 ${newPrefix} 』\n💡 Example: ${newPrefix}help`;
      return api.sendMessage(msg, threadId);

    } catch (error) {
      return api.sendMessage('❌ Error executing prefix command.', threadId);
    }
  }
};
