const Database = require('../database/reg.json'); // Importa tu clase Database
const db = new Database();

// Middleware de verificación de registro
function checkRegistration() {
  return async (ctx, next) => {
    const userId = ctx.from.id;
    const command = ctx.message?.text?.split(' ')[0]?.toLowerCase();

    // Comandos permitidos SIN registro
    const allowedCommands = ['/reg', '/delete_reg', '/start'];

    // Si el comando está permitido, continuar
    if (allowedCommands.includes(command)) {
      return next();
    }

    // Buscar usuario en la base de datos (en memoria)
    const isRegistered = db.users.some(user => user.id_telegram === userId);

    // Si NO está registrado, bloquear acción
    if (!isRegistered) {
      await ctx.reply(
        '🔐 Debes estar registrado para usar este comando.\n' +
        'Usa: `/reg [nombre.edad]`\nEjemplo: `/reg luis.25`',
        { parse_mode: 'Markdown', reply_to_message_id: ctx.message.message_id }
      );
      return;
    }

    next(); // Usuario registrado: continuar
  };
}

module.exports = checkRegistration;