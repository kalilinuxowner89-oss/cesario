// Echo Plugin - Echoes back messages
module.exports = {
  name: 'echo',
  description: 'Echo back messages',
  version: '1.0.0',

  execute(message) {
    return `Echo: ${message}`;
  },

  help() {
    return '/echo <message> - Repeat your message';
  }
};