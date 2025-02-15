const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const path = require('path');
const messages = require('../enums/mensajes.js');

// Usar path para manejo seguro de rutas
const pdfPath = path.resolve(__dirname, '../../docs/Cinturilla13Varillas.pdf');
const pdfPath1 = path.resolve(__dirname, '../../docs/sola.mp4');  // Asegúrate de que el archivo esté aquí

const flowCinturillaSola = addKeyword(EVENTS.ACTION)
    .addAnswer('⏳')
    .addAnswer(' ', { media: pdfPath ,filename: 'Cinturilla13Varillas.pdf'})
    .addAnswer('⏳')
    .addAnswer(' ', { media: pdfPath1 ,filename: 'sola.mp4'})
    .addAnswer(messages.furtherAssistance)

module.exports = flowCinturillaSola;