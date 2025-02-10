// menu.js

const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const flowTallas = require('./tallas.js');
const flowMaterialCinturillaSola = require('./materialCinturillaSola.js');
const flowMaterialCinturillaCha = require('./materialCinturillaChaleco.js');
const flowCompra = require('./compra.js');
const flowCinturillaSola = require('./cinturillaSola.js');
const flowCinturillaChaleco = require('./cinturillaChaleco.js');
const messages = require('./mensajes.js');

const flowMenu = addKeyword('Si')
    .addAnswer(messages.menuPrompt, { capture: true }, async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
        console.log("async");
        
        if (!['1', '2', '3', '4', '5', '6'].includes(ctx.body)) {
            console.log("if");
            return fallBack(messages.menuFallback);
        }
        
        const userChoice = ctx.body.trim();
        switch (userChoice) {
            case '1':
                console.log("flowCinturillaSola");
                return gotoFlow(flowCinturillaSola);
            case '2':
                console.log("flowCinturillaChaleco");
                return gotoFlow(flowCinturillaChaleco);
            case '3':
                console.log("flowMaterialCinturillaSola");
                return gotoFlow(flowMaterialCinturillaSola);
            case '4':
                console.log("flowMaterialCinturillaCha");
                return gotoFlow(flowMaterialCinturillaCha);
            case '5':
                console.log("flowTallas");
                return gotoFlow(flowTallas);
            case '6':
                console.log("flowCompra");
                return;
            default:
                return await flowDynamic(messages.menuFallback);
        }
    });

module.exports = flowMenu;