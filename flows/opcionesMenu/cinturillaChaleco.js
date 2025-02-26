const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const path = require('path');
const messages = require('../enums/mensajes.js');
const flowMenu = require('../menu.js');
// Usar path para manejo seguro de rutas
const pdfPath = path.resolve(__dirname, '../../docs/Cinturilla13varillasChaleco.pdf'); // Asegúrate de que el archivo esté aquí
const pdfPath1 = path.resolve(__dirname, '../../docs/chaleco.mp4'); 
const { v4: uuidv4 } = require('uuid');
const ramdomString = uuidv4();

const flowCinturillaChaleco = addKeyword(ramdomString)
        .addAnswer('⏳')
        .addAnswer(' ', { media: pdfPath ,filename: 'Cinturilla13VarillasChaleco.pdf'})
        .addAnswer('⏳')
        .addAnswer(' ', { media: pdfPath1 ,filename: 'sola.mp4'})
        .addAnswer(messages.furtherAssistance, { capture: true }, async (ctx, { gotoFlow,fallBack, flowDynamic }) => {
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
       

module.exports = flowCinturillaChaleco;
