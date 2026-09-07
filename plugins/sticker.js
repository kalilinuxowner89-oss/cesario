// Sticker Plugin - Create stickers from images
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'sticker',
  description: 'Convert images to stickers',
  version: '1.0.0',

  async execute(imagePath) {
    try {
      const outputPath = path.join(__dirname, '..', 'stickers', `sticker_${Date.now()}.png`);
      
      // Ensure stickers directory exists
      const stickersDir = path.dirname(outputPath);
      if (!fs.existsSync(stickersDir)) {
        fs.mkdirSync(stickersDir, { recursive: true });
      }

      // Convert and resize image
      await sharp(imagePath)
        .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toFile(outputPath);

      return `✅ Sticker created: ${outputPath}`;
    } catch (error) {
      return `❌ Sticker creation failed: ${error.message}`;
    }
  },

  help() {
    return '/sticker <image> - Convert image to sticker';
  }
};