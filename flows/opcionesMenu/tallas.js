const { addKeyword, addFlow, EVENTS } = require('@bot-whatsapp/bot'); 
const messages = require('../enums/mensajes.js');
const path = require('path');
const flowMenu = require('../menu.js');
const DOMAIN = process.env.DOMAIN || 'localhost:3000';
const isLocalhost = DOMAIN.includes('localhost');
const pdfPath = `${isLocalhost ? 'http' : 'https'}://${DOMAIN}/docs/talla1.jpg`;
const pdfPath1 =`${isLocalhost ? 'http' : 'https'}://${DOMAIN}/docs/talla2.jpg`; // Asegúrate de que el archivo esté aquí

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
    

// Usa `addFlow` para conectar los flows correctamente
module.exports = flowTallas;
