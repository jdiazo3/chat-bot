const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const path = require('path');
const messages = require('../enums/mensajes.js');
const flowCinturillaChaleco = require('../menu.js');

// Usar path para manejo seguro de rutas
const pdfPath = path.resolve(__dirname, '../../docs/Cinturilla13Varillas.pdf');
const pdfPath1 = path.resolve(__dirname, '../../docs/sola.mp4');  // Asegúrate de que el archivo esté aquí


const flowCinturillaSola = addKeyword(EVENTS.ACTION)  // Usamos EVENTS.ACTION para capturar la acción
    .addAnswer('⏳')  // Enviar mensaje de espera
    .addAnswer(' ', { media: pdfPath, filename: 'Cinturilla13Varillas.pdf' })  // Enviar el archivo PDF
    .addAnswer('⏳')  // Enviar mensaje de espera
    .addAnswer(' ', { media: pdfPath1, filename: 'sola.mp4' })  // Enviar el archivo de video
    .addAnswer(messages.furtherAssistance);



module.exports = flowCinturillaSola;
