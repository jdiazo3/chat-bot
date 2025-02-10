// flowPrincipal.js

const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const flowTallas = require('./tallas.js');
const flowMaterialCinturillaSola = require('./materialCinturillaSola.js');
const flowMaterialCinturillaCha = require('./materialCinturillaChaleco.js');
const flowCompra = require('./compra.js');
const flowCinturillaSola = require('./cinturillaSola.js');
const flowCinturillaChaleco = require('./cinturillaChaleco.js');
const messages = require('./mensajes.js');

const flowPrincipal = addKeyword(EVENTS.WELCOME)
    .addAnswer(messages.welcomeMessage)
    .addAnswer(messages.menuPrompt, { capture: true }, async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
        if (!['1', '2', '3', '4', '5', '6'].includes(ctx.body)) {
            return fallBack(messages.menuFallback);
        }

        const userChoice = ctx.body.trim();
        switch (userChoice) {
            case '1':
                return gotoFlow(flowCinturillaSola);
            case '2':
                return gotoFlow(flowCinturillaChaleco);
            case '3':
                return gotoFlow(flowMaterialCinturillaSola);
            case '4':
                return gotoFlow(flowMaterialCinturillaCha);
            case '5':
                return gotoFlow(flowTallas);
            case '6':
                console.log("flowCompra");
                return;
            default:
                return await flowDynamic(messages.menuFallback);
        }
    });

module.exports = flowPrincipal;