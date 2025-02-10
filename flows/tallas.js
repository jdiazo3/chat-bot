const { addKeyword, addFlow, EVENTS } = require('@bot-whatsapp/bot'); 
const messages = require('./mensajes.js');

const flowTallas = addKeyword(EVENTS.ACTION)
    .addAnswer(' ', {
        media: 'https://drive.google.com/uc?export=view&id=1Z-l2NR-sGjChGjjHqLii0V0oImlOvChv'
    })
    .addAnswer(' ', {
        media: 'https://drive.google.com/uc?export=view&id=1zynwzUk8W_wVYhoyQHoOiF0miK44q2-l'
    }).addAnswer(messages.furtherAssistance);

// Usa `addFlow` para conectar los flows correctamente
module.exports = flowTallas;
