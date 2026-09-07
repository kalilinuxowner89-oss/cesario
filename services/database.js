const mongoose = require('mongoose');
const logger = require('./logger');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cesario';

const database = {
  async connect() {
    try {
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      logger.info('MongoDB connected successfully');
      return mongoose.connection;
    } catch (error) {
      logger.error('MongoDB connection error:', error);
      throw error;
    }
  },

  async disconnect() {
    try {
      await mongoose.disconnect();
      logger.info('MongoDB disconnected');
    } catch (error) {
      logger.error('MongoDB disconnection error:', error);
      throw error;
    }
  },

  getConnection() {
    return mongoose.connection;
  },

  async dropDatabase() {
    try {
      await mongoose.connection.dropDatabase();
      logger.info('Database dropped');
    } catch (error) {
      logger.error('Error dropping database:', error);
      throw error;
    }
  }
};

module.exports = database;