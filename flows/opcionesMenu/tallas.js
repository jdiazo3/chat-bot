const { addKeyword, addFlow, EVENTS } = require('@bot-whatsapp/bot'); 
const messages = require('../enums/mensajes.js');
const path = require('path');
const flowMenu = require('../menu.js');
const pdfPath = path.resolve(__dirname, '../../docs/talla1.jpg'); 
const pdfPath1 = path.resolve(__dirname, '../../docs/talla2.jpg'); 
const { v4: uuidv4 } = require('uuid');
const ramdomString = uuidv4();

const flowTallas = addKeyword(ramdomString)
    .addAnswer('⏳')
    .addAnswer(' ', {
        media: pdfPath
    })
    .addAnswer(' ', {
        media: pdfPath1
    }).addAnswer(messages.furtherAssistance, { capture: true }, async (ctx, { gotoFlow,fallBack, flowDynamic }) => {
            if (!['si', 'no'].includes(ctx.body.toLowerCase())) {
                        return fallBack(messages.colorFallback);
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
    

// Usa `addFlow` para conectar los flows correctamente
module.exports = flowTallas;
