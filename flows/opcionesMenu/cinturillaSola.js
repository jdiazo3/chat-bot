const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const path = require('path');
const messages = require('../enums/mensajes.js');
const flowCinturillaChaleco = require('../menu.js');
const flowMenu = require('../menu.js');
// Usar path para manejo seguro de rutas
const pdfPath = path.resolve(__dirname, '../../docs/Cinturilla13Varillas.pdf');
const pdfPath1 = path.resolve(__dirname, '../../docs/sola.mp4');  // Asegúrate de que el archivo esté aquí
const { v4: uuidv4 } = require('uuid');
const ramdomString = uuidv4();

const flowCinturillaSola = addKeyword(ramdomString)  // Usamos EVENTS.ACTION para capturar la acción
    .addAnswer('⏳')  // Enviar mensaje de espera
    .addAnswer(' ', { media: pdfPath, filename: 'Cinturilla13Varillas.pdf' })  // Enviar el archivo PDF
    .addAnswer('⏳')  // Enviar mensaje de espera
    .addAnswer(' ', { media: pdfPath1, filename: 'sola.mp4' })  // Enviar el archivo de video
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



module.exports = flowCinturillaSola;
