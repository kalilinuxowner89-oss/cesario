const express = require('express');
const router = express.Router();
const botManager = require('../services/botManager');
const logger = require('../services/logger');

// Get bot status
router.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    bot: 'Cesario',
    version: '1.0.0',
    timestamp: new Date()
  });
});

// Ban endpoints
router.post('/bans/add', async (req, res) => {
  try {
    const { number, reason } = req.body;
    if (!number) {
      return res.status(400).json({ error: 'Number is required' });
    }
    const ban = await botManager.banManager.banNumber(number, reason);
    res.json({ success: true, ban });
  } catch (error) {
    logger.error('Error adding ban:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/bans/remove', async (req, res) => {
  try {
    const { number } = req.body;
    if (!number) {
      return res.status(400).json({ error: 'Number is required' });
    }
    const result = await botManager.banManager.unbanNumber(number);
    res.json({ success: true, result });
  } catch (error) {
    logger.error('Error removing ban:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/bans', async (req, res) => {
  try {
    const bans = await botManager.banManager.getBannedNumbers();
    res.json({ success: true, bans });
  } catch (error) {
    logger.error('Error getting bans:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/bans/count', async (req, res) => {
  try {
    const count = await botManager.banManager.getTotalBannedCount();
    res.json({ success: true, count });
  } catch (error) {
    logger.error('Error getting ban count:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/bans/check/:number', async (req, res) => {
  try {
    const { number } = req.params;
    const isBanned = await botManager.banManager.isBanned(number);
    res.json({ success: true, number, isBanned });
  } catch (error) {
    logger.error('Error checking ban status:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;