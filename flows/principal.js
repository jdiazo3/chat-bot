// flowPrincipal.js

const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const flowTallas = require('./opcionesMenu/tallas.js');
const flowMaterialCinturillaSola = require('./opcionesMenu/materialCinturillaSola.js');
const flowCinturillaSola = require('./opcionesMenu/cinturillaSola.js');
const flowCinturillaChaleco = require('./opcionesMenu/cinturillaChaleco.js');
const messages = require('./enums/mensajes.js');
const flowCancelacion = require('./opcionesMenu/cancelacion.js');
const flowCompra =  require('./opcionesMenu/compra.js');


const flowPrincipal = addKeyword(EVENTS.WELCOME)
    .addAnswer(messages.welcomeMessage)
    .addAnswer(messages.menuPrompt, { capture: true }, async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
        if (!['1', '2', '3', '4', '5', '6', '7','juandiaz03','juandiaz02','Gracias'].includes(ctx.body)) {
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
                return gotoFlow(flowTallas);
            case '5':
                return gotoFlow(flowCompra);
            case '6':
                return gotoFlow(flowCancelacion);
            case 'juandiaz02':
                console.log("flowEnvioDiario");
                return;
            case 'juandiaz03':
                    console.log("flowEnvioGuia");
                    return;
            case 'Gracias':
                    console.log("flowEnvioGuia");
                    return;
            default:
                return await flowDynamic(messages.menuFallback);
        }
    });

module.exports = flowPrincipal;