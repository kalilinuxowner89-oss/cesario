const logger = require('./logger');
const BanManager = require('./banManager');
const axios = require('axios');

const botManager = {
  bots: {},
  banManager: new BanManager(),

  async initialize() {
    try {
      logger.info('Initializing bot manager');
      await this.banManager.initialize();
      logger.info('Bot manager initialized');
    } catch (error) {
      logger.error('Error initializing bot manager:', error);
      throw error;
    }
  },

  async handleMessage(message) {
    try {
      const phoneNumber = message.from;
      const messageText = message.text || '';
      const messageId = message.id;

      // Check if number is banned
      const isBanned = await this.banManager.isBanned(phoneNumber);
      if (isBanned) {
        logger.info(`Blocked message from banned number: ${phoneNumber}`);
        return;
      }

      // Handle commands
      if (messageText.startsWith('/')) {
        await this.handleCommand(phoneNumber, messageText, message);
      } else {
        // Handle regular message
        await this.handleRegularMessage(phoneNumber, messageText, message);
      }
    } catch (error) {
      logger.error('Error handling message:', error);
    }
  },

  async handleCommand(phoneNumber, command, message) {
    const parts = command.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case '/ban':
        await this.handleBanCommand(phoneNumber, args, message);
        break;
      case '/unban':
        await this.handleUnbanCommand(phoneNumber, args, message);
        break;
      case '/banlist':
        await this.handleBanListCommand(phoneNumber, message);
        break;
      case '/help':
        await this.sendMessage(phoneNumber, this.getHelpText());
        break;
      default:
        await this.sendMessage(phoneNumber, '❌ Commande non reconnue. Tapez /help');
    }
  },

  async handleBanCommand(phoneNumber, args, message) {
    // Only admin can ban
    if (!await this.isAdmin(phoneNumber)) {
      await this.sendMessage(phoneNumber, '❌ Vous n\'avez pas les permissions');
      return;
    }

    if (args.length === 0) {
      await this.sendMessage(phoneNumber, '❌ Usage: /ban <numéro>');
      return;
    }

    const targetNumber = args[0];
    try {
      await this.banManager.banNumber(targetNumber);
      await this.sendMessage(phoneNumber, `✅ Numéro ${targetNumber} banni avec succès`);
      logger.info(`Number ${targetNumber} banned by ${phoneNumber}`);
    } catch (error) {
      await this.sendMessage(phoneNumber, `❌ Erreur: ${error.message}`);
    }
  },

  async handleUnbanCommand(phoneNumber, args, message) {
    // Only admin can unban
    if (!await this.isAdmin(phoneNumber)) {
      await this.sendMessage(phoneNumber, '❌ Vous n\'avez pas les permissions');
      return;
    }

    if (args.length === 0) {
      await this.sendMessage(phoneNumber, '❌ Usage: /unban <numéro>');
      return;
    }

    const targetNumber = args[0];
    try {
      await this.banManager.unbanNumber(targetNumber);
      await this.sendMessage(phoneNumber, `✅ Numéro ${targetNumber} débanni avec succès`);
      logger.info(`Number ${targetNumber} unbanned by ${phoneNumber}`);
    } catch (error) {
      await this.sendMessage(phoneNumber, `❌ Erreur: ${error.message}`);
    }
  },

  async handleBanListCommand(phoneNumber, message) {
    // Only admin can view banlist
    if (!await this.isAdmin(phoneNumber)) {
      await this.sendMessage(phoneNumber, '❌ Vous n\'avez pas les permissions');
      return;
    }

    try {
      const bannedList = await this.banManager.getBannedNumbers();
      if (bannedList.length === 0) {
        await this.sendMessage(phoneNumber, '📋 Aucun numéro banni');
      } else {
        let text = '📋 *Numéros bannis:*\n\n';
        bannedList.forEach((item, index) => {
          text += `${index + 1}. ${item.number} (${new Date(item.bannedAt).toLocaleDateString()})\n`;
        });
        await this.sendMessage(phoneNumber, text);
      }
    } catch (error) {
      await this.sendMessage(phoneNumber, `❌ Erreur: ${error.message}`);
    }
  },

  async handleRegularMessage(phoneNumber, messageText, message) {
    logger.info(`Message from ${phoneNumber}: ${messageText}`);
    // Process regular message
  },

  async sendMessage(phoneNumber, text) {
    try {
      const payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: phoneNumber,
        type: 'text',
        text: { body: text }
      };

      const response = await axios.post(
        `https://graph.instagram.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      logger.info(`Message sent to ${phoneNumber}`);
      return response.data;
    } catch (error) {
      logger.error(`Error sending message to ${phoneNumber}:`, error);
      throw error;
    }
  },

  async isAdmin(phoneNumber) {
    // Check if user is admin (you can customize this logic)
    return phoneNumber === process.env.ADMIN_PHONE || false;
  },

  getHelpText() {
    return `🤖 *Cesario Bot Help*\n\n📋 Commandes disponibles:\n\n/ban <numéro> - Bannir un numéro\n/unban <numéro> - Débannir un numéro\n/banlist - Voir la liste des bannis\n/help - Afficher cette aide`;
  }
};

module.exports = botManager;