const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const path = require('path');
const messages = require('../enums/mensajes.js');

// Usar path para manejo seguro de rutas
const pdfPath = path.resolve(__dirname, '../../docs/Cinturilla13varillasChaleco.pdf'); // Asegúrate de que el archivo esté aquí
const pdfPath1 = path.resolve(__dirname, '../../docs/chaleco.mp4'); 

const flowCinturillaChaleco = addKeyword(EVENTS.ACTION)
        .addAnswer('⏳')
        .addAnswer(' ', { media: pdfPath ,filename: 'Cinturilla13VarillasChaleco.pdf'})
        .addAnswer('⏳')
        .addAnswer(' ', { media: pdfPath1 ,filename: 'sola.mp4'})
        .addAnswer(messages.furtherAssistance, { capture: true }, async (ctx, { state,fallBack, flowDynamic }) => {
                    if (!['si', 'no'].includes(ctx.body.toLowerCase())) {
                                return fallBack(messages.colorFallback);
                            }
                        });

module.exports = flowCinturillaChaleco;
