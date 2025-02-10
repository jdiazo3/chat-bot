const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const path = require('path');
const messages = require('./mensajes.js');

// Usar path para manejo seguro de rutas
const pdfPath = path.resolve(__dirname, '../docs/Cinturilla13varillasChaleco.pdf'); // Asegúrate de que el archivo esté aquí


const flowCinturillaChaleco = addKeyword(EVENTS.ACTION)
        .addAnswer('⏳')
        .addAnswer(' ', { media: pdfPath ,filename: 'Cinturilla13VarillasChaleco.pdf'})
        .addAnswer(messages.furtherAssistance);

module.exports = flowCinturillaChaleco;
