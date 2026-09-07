// Info Plugin - Get bot information
module.exports = {
  name: 'info',
  description: 'Get bot information',
  version: '1.0.0',

  execute(message) {
    return `ℹ️ Cesario Bot v1.0.0\n🤖 Status: Active\n📱 API: WhatsApp Business\n🔒 Features: Ban System, Auto-responses`;
  },

  help() {
    return '/info - Get bot information';
  }
};