// Ban Plugin - Manage bans
module.exports = {
  name: 'ban',
  description: 'Manage user bans',
  version: '1.0.0',

  async execute(message, botManager) {
    const parts = message.split(' ');
    if (parts[0] === '/ban' && parts[1]) {
      const number = parts[1];
      await botManager.banManager.banNumber(number);
      return `✅ Number ${number} has been banned`;
    }
    return '❌ Invalid command';
  },

  help() {
    return '/ban <number> - Ban a WhatsApp number';
  }
};