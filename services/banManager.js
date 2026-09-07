const logger = require('./logger');
const mongoose = require('mongoose');

// Ban schema
const banSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  reason: String,
  bannedAt: {
    type: Date,
    default: Date.now
  },
  bannedBy: String,
  permanent: {
    type: Boolean,
    default: true
  },
  expiresAt: Date
});

const Ban = mongoose.models.Ban || mongoose.model('Ban', banSchema);

class BanManager {
  async initialize() {
    try {
      logger.info('BanManager initialized');
    } catch (error) {
      logger.error('Error initializing BanManager:', error);
      throw error;
    }
  }

  async banNumber(number, reason = 'No reason provided', bannedBy = 'System') {
    try {
      const existingBan = await Ban.findOne({ number });
      if (existingBan) {
        throw new Error(`Le numéro ${number} est déjà banni`);
      }

      const ban = new Ban({
        number,
        reason,
        bannedBy,
        permanent: true
      });

      await ban.save();
      logger.info(`Number ${number} banned successfully`);
      return ban;
    } catch (error) {
      logger.error(`Error banning number ${number}:`, error);
      throw error;
    }
  }

  async unbanNumber(number) {
    try {
      const result = await Ban.findOneAndDelete({ number });
      if (!result) {
        throw new Error(`Le numéro ${number} n'est pas banni`);
      }
      logger.info(`Number ${number} unbanned successfully`);
      return result;
    } catch (error) {
      logger.error(`Error unbanning number ${number}:`, error);
      throw error;
    }
  }

  async isBanned(number) {
    try {
      const ban = await Ban.findOne({ number });
      if (!ban) return false;

      // Check if ban has expired
      if (!ban.permanent && ban.expiresAt && ban.expiresAt < new Date()) {
        await Ban.deleteOne({ _id: ban._id });
        return false;
      }

      return true;
    } catch (error) {
      logger.error(`Error checking if number is banned:`, error);
      return false;
    }
  }

  async getBannedNumbers() {
    try {
      const bans = await Ban.find({}).sort({ bannedAt: -1 });
      return bans;
    } catch (error) {
      logger.error('Error getting banned numbers:', error);
      throw error;
    }
  }

  async getTotalBannedCount() {
    try {
      const count = await Ban.countDocuments({});
      return count;
    } catch (error) {
      logger.error('Error getting banned count:', error);
      throw error;
    }
  }

  async clearExpiredBans() {
    try {
      const result = await Ban.deleteMany({
        permanent: false,
        expiresAt: { $lt: new Date() }
      });
      logger.info(`Cleared ${result.deletedCount} expired bans`);
      return result;
    } catch (error) {
      logger.error('Error clearing expired bans:', error);
      throw error;
    }
  }
}

module.exports = BanManager;