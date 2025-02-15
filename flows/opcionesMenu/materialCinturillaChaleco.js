// flowMaterialCinturillaCha.js

const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const messages = require('../enums/mensajes.js');

const flowMaterialCinturillaCha = addKeyword(EVENTS.ACTION)
    .addAnswer(messages.materialChaInfo)
    .addAnswer(messages.furtherAssistance);

// Ensure proper export
module.exports = flowMaterialCinturillaCha;