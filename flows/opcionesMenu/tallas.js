const { addKeyword, addFlow, EVENTS } = require('@bot-whatsapp/bot'); 
const messages = require('../enums/mensajes.js');
const path = require('path');

const pdfPath = path.resolve(__dirname, '../../docs/talla1.jpg'); 
const pdfPath1 = path.resolve(__dirname, '../../docs/talla2.jpg'); 

const flowTallas = addKeyword(EVENTS.ACTION)
    .addAnswer('⏳')
    .addAnswer(' ', {
        media: pdfPath
    })
    .addAnswer(' ', {
        media: pdfPath1
    }).addAnswer(messages.furtherAssistance);

// Usa `addFlow` para conectar los flows correctamente
module.exports = flowTallas;
