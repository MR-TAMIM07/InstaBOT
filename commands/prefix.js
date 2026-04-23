module.exports = {
  config: {
    name: 'prefix',
    aliases: ['setprefix', 'changeprefix'],
    version: '1.5.0',
    author: '—͟͞͞𝐓𝐀𝐌𝐈𝐌',
    role: 0,
    cooldown: 5,
    category: 'config',
    description: 'Change the bot prefix for your chat or globally (admin only)',
    usage: 'prefix [new prefix] [-g] | prefix reset | prefix'
  },

  async run({ api, event, args, bot, logger, database, config, PermissionManager, ConfigManager }) {
    try {
      const currentPrefix = config.PREFIX;
      const threadId = event.threadId;
      const userId = event.senderID;

      // Stylish Header Frame
      const header = `╭─────────────◊\n│  ✨ 𝐏𝐑𝐄𝐅𝐈𝐗 𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒\n╰─────────────◊\n\n`;

      // If no arguments, show usage
      if (args.length === 0) {
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

      // Handle reset
      if (args[0].toLowerCase() === 'reset') {
        database.setThreadData(threadId, { prefix: null });
        
        let msg = `╭─────────────◊\n`;
        msg += `│  ✅ 𝐏𝐑𝐄𝐅𝐈𝐗 𝐑𝐄𝐒𝐄𝐓\n`;
        msg += `╰─────────────◊\n\n`;
        msg += `❐ Chat prefix has been reset to default.\n`;
        msg += `❐ 𝐍𝐞𝐰 𝐏𝐫𝐞𝐟𝐢𝐱: 『 ${currentPrefix} 』\n`;
        msg += `────────────────`;
        
        return api.sendMessage(msg, threadId);
      }

      const newPrefix = args[0];
      const isGlobal = args[1] === '-g' || args[1] === '--global';

      // Validate new prefix
      if (newPrefix.length > 5) {
        return api.sendMessage('❌ 𝐏𝐫𝐞𝐟𝐢𝐱 𝐦𝐮𝐬𝐭 𝐛𝐞 𝟓 𝐜𝐡𝐚𝐫𝐚𝐜𝐭𝐞𝐫𝐬 𝐨𝐫 𝐥𝐞𝐬𝐬!', threadId);
      }

      if (newPrefix.includes(' ')) {
        return api.sendMessage('❌ 𝐏𝐫𝐞𝐟𝐢𝐱 𝐜𝐚𝐧𝐧𝐨𝐭 𝐜𝐨𝐧𝐭𝐚𝐢𝐧 𝐬𝐩𝐚𝐜𝐞𝐬!', threadId);
      }

      // Handle global prefix change (admin only)
      if (isGlobal) {
        const hasAdminPermission = await PermissionManager.hasPermission(userId, 2);
        
        if (!hasAdminPermission) {
          return api.sendMessage(
            '❌ 𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃\n\nOnly bot administrators can change the global prefix.',
            threadId
          );
        }

        try {
          ConfigManager.updateConfig('PREFIX', newPrefix);
          
          let msg = `╭─────────────◊\n`;
          msg += `│  🌍 𝐆𝐋𝐎𝐁𝐀𝐋 𝐏𝐑𝐄𝐅𝐈𝐗\n`;
          msg += `╰─────────────◊\n\n`;
          msg += `✅ System prefix updated globally!\n`;
          msg += `❐ 𝐍𝐞𝐰 𝐏𝐫𝐞𝐟𝐢𝐱: 『 ${newPrefix} 』\n`;
          msg += `❐ 𝐂𝐡𝐚𝐧𝐠𝐞𝐝 𝐛𝐲: ${userId}\n\n`;
          msg += `⚠️ This affects all users and groups.`;
          
          logger.info(`Global prefix changed to "${newPrefix}" by user ${userId}`);
          return api.sendMessage(msg, threadId);
          
        } catch (error) {
          logger.error('Failed to update global prefix', { error: error.message });
          return api.sendMessage('❌ Failed to update global prefix.', threadId);
        }
      }

      // Handle thread-specific prefix change
      const threadData = database.getThreadData(threadId) || {};
      threadData.prefix = newPrefix;
      database.setThreadData(threadId, threadData);

      let msg = `╭─────────────◊\n`;
      msg += `│  ✅ 𝐏𝐑𝐄𝐅𝐈𝐗 𝐂𝐇𝐀𝐍𝐆𝐄𝐃\n`;
      msg += `╰─────────────◊\n\n`;
      msg += `❐ New prefix for this chat: 『 ${newPrefix} 』\n`;
      msg += `❐ Global prefix: 『 ${currentPrefix} 』\n\n`;
      msg += `💡 𝐄𝐱𝐚𝐦𝐩𝐥𝐞: ${newPrefix}help\n`;
      msg += `────────────────`;

      logger.info(`Thread prefix changed to "${newPrefix}" for thread ${threadId}`);
      return api.sendMessage(msg, threadId);

    } catch (error) {
      logger.error('Error in prefix command', { error: error.message });
      return api.sendMessage('❌ Error executing prefix command.', event.threadId);
    }
  }
};
