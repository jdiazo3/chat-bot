// flowMaterialCinturillaSola.js

const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const flowMenu = require('../menu.js');
const messages = require('../enums/mensajes.js');

const flowMaterialCinturillaSola = addKeyword(EVENTS.ACTION)
    .addAnswer(messages.materialInfo)
    .addAnswer(messages.furtherAssistance);

// Ensure proper export
module.exports = flowMaterialCinturillaSola;