const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const path = require('path');
const messages = require('./mensajes.js');

// Usar path para manejo seguro de rutas
const pdfPath = path.resolve(__dirname, '../docs/Cinturilla13Varillas.pdf'); // Asegúrate de que el archivo esté aquí

const flowCinturillaSola = addKeyword(EVENTS.ACTION)
    .addAnswer('⏳')
    .addAnswer(' ', { media: pdfPath ,filename: 'Cinturilla13Varillas.pdf'})
    .addAnswer(messages.furtherAssistance)

module.exports = flowCinturillaSola;