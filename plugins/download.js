// Download Plugin - Download media from links
const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'download',
  description: 'Download media from links',
  version: '1.0.0',

  async execute(url) {
    try {
      const fileName = `download_${Date.now()}.mp4`;
      const filePath = path.join(__dirname, '..', 'downloads', fileName);
      
      const response = await axios.get(url, {
        responseType: 'stream',
        timeout: 30000
      });

      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(`✅ Downloaded: ${fileName}`));
        writer.on('error', reject);
      });
    } catch (error) {
      return `❌ Download failed: ${error.message}`;
    }
  },

  help() {
    return '/download <url> - Download media from URL';
  }
};