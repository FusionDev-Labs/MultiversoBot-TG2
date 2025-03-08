const axios = require('axios');

module.exports = (bot) => {
  bot.command('pinterest', async (conn) => {
    const query = conn.message.text.split(' ').slice(1).join(' ');
    if (!query) return conn.reply('❌ Ingresa un término de búsqueda después de /pinterest.', {
      reply_to_message_id: conn.message.message_id,
    });

    try {
      const response = await axios.get(`https://itzpire.com/search/pinterest?query=${encodeURIComponent(query)}`);
      const imageData = response.data;

      if (imageData.status !== 'success' || !imageData.data.length) {
        return conn.reply(`❌ No se encontraron imágenes para: *${query}*.`, {
          parse_mode: 'Markdown',
          reply_to_message_id: conn.message.message_id,
        });
      }

      const randomImage = imageData.data[Math.floor(Math.random() * imageData.data.length)];
      await conn.replyWithPhoto(randomImage.image, {
        caption: `️ *${randomImage.caption || 'Sin título'}*\n [Fuente](${randomImage.source})`,
        parse_mode: 'Markdown',
        reply_to_message_id: conn.message.message_id,
      });
    } catch {
      conn.reply('❌ Error al buscar imágenes. Intenta nuevamente más tarde.', {
        reply_to_message_id: conn.message.message_id,
      });
    }
  });
};
