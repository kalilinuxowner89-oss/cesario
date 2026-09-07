const express = require('express');
const router = express.Router();
const logger = require('../services/logger');

// Mock bots database (use MongoDB in production)
const bots = [];

router.get('/', (req, res) => {
  res.json({ success: true, bots, count: bots.length });
});

router.post('/', (req, res) => {
  try {
    const { name, description, active } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Bot name required' });
    }

    const bot = {
      id: Date.now().toString(),
      name,
      description,
      active: active !== false,
      createdAt: new Date()
    };

    bots.push(bot);
    logger.info(`Bot ${name} created`);
    res.status(201).json({ success: true, bot });
  } catch (error) {
    logger.error('Error creating bot:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', (req, res) => {
  const bot = bots.find(b => b.id === req.params.id);
  if (!bot) {
    return res.status(404).json({ error: 'Bot not found' });
  }
  res.json({ success: true, bot });
});

router.put('/:id', (req, res) => {
  try {
    const bot = bots.find(b => b.id === req.params.id);
    if (!bot) {
      return res.status(404).json({ error: 'Bot not found' });
    }

    Object.assign(bot, req.body, { id: bot.id, createdAt: bot.createdAt });
    res.json({ success: true, bot });
  } catch (error) {
    logger.error('Error updating bot:', error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const index = bots.findIndex(b => b.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Bot not found' });
    }
    const [deletedBot] = bots.splice(index, 1);
    logger.info(`Bot ${deletedBot.name} deleted`);
    res.json({ success: true, message: 'Bot deleted', bot: deletedBot });
  } catch (error) {
    logger.error('Error deleting bot:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;