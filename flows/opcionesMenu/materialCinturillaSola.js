// flowMaterialCinturillaSola.js

const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const flowMenu = require('../menu.js');
const messages = require('../enums/mensajes.js');
const { v4: uuidv4 } = require('uuid');
const ramdomString = uuidv4();

const flowMaterialCinturillaSola = addKeyword(ramdomString)
    .addAnswer(messages.materialInfo)
    .addAnswer(messages.materialChaInfo)
    .addAnswer(messages.furtherAssistance, { capture: true }, async (ctx, { gotoFlow,fallBack, flowDynamic }) => {
            if (!['si', 'no'].includes(ctx.body.toLowerCase())) {
                        return fallBack(messages.sinoFallback);
                    }
                    console.log('antes del si');
                    if('si'===ctx.body.toLowerCase()){
                        console.log('entro al si');
                        return gotoFlow(require('../menu.js'));
                    }else{
                        console.log('entro al else');
                        return gotoFlow(require('../despedida.js'));
                    }
                });
    

// Ensure proper export
module.exports = flowMaterialCinturillaSola;