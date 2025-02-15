// menu.js

const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const flowTallas = require('./opcionesMenu/tallas.js');
const flowMaterialCinturillaSola = require('./opcionesMenu/materialCinturillaSola.js');
const flowMaterialCinturillaCha = require('./opcionesMenu/materialCinturillaChaleco.js');
const flowCinturillaSola = require('./opcionesMenu/cinturillaSola.js');
const flowCinturillaChaleco = require('./opcionesMenu/cinturillaChaleco.js');
const messages = require('./enums/mensajes.js');
const flowCancelacion = require('./opcionesMenu/cancelacion.js');



const flowMenu = addKeyword('Si')
    .addAnswer(messages.menuPrompt, { capture: true }, async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
        console.log("async");
        
        if (!['1', '2', '3', '4', '5', '6', '7','juandiaz03','juandiaz02'].includes(ctx.body)) {
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
            case '7':
                console.log("flowCancelacion");
                return gotoFlow(flowCancelacion);
            case 'juandiaz03':
                console.log("flowEnvioDiario");
                return;
            case 'juandiaz02':
                console.log("flowEnvioGuia");
                return;
            default:
                return await flowDynamic(messages.menuFallback);
        }
    });

module.exports = flowMenu;