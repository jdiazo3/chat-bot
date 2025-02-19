// flowMaterialCinturillaSola.js

const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const flowMenu = require('../menu.js');
const messages = require('../enums/mensajes.js');

const flowMaterialCinturillaSola = addKeyword(EVENTS.ACTION)
    .addAnswer(messages.materialInfo)
    .addAnswer(messages.materialChaInfo)
    .addAnswer(messages.furtherAssistance, { capture: true }, async (ctx, { state,fallBack, flowDynamic }) => {
                if (!['si', 'no'].includes(ctx.body.toLowerCase())) {
                            return fallBack(messages.colorFallback);
                        }
                    });

// Ensure proper export
module.exports = flowMaterialCinturillaSola;