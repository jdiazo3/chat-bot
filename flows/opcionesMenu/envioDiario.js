const { addKeyword } = require('@bot-whatsapp/bot'); 
const messages = require('../enums/mensajes.js');
const { guardarPedidoEnExcel } = require('../persistencia/saveExcel.js');
const path = require('path');
const DOMAIN = process.env.DOMAIN || 'localhost:3000';
const isLocalhost = DOMAIN.includes('localhost');
const pdfPath = `${isLocalhost ? 'http' : 'https'}://${DOMAIN}/docs/Clientes.xlsx`;


const flowEnvioDiario = addKeyword('juandiaz03', { sensitive: true })
    .addAnswer(messages.menuNeodimio, { capture: true }, async (ctx, { fallBack,flowDynamic }) => {
            console.log("recibio : ", ctx.body);
            if (!['1'].includes(ctx.body)) {
                return fallBack(messages.menuNeodimio);
            }
            if (ctx.body === '1') {
                console.log("enviar excel");

                // Manejo de errores de guardarPedidoEnExcel
                await guardarPedidoEnExcel()
                console.log("enviado");
                return await flowDynamic('Se genero el excel correctamente.')
            }
    })
    .addAnswer(' ',{media :pdfPath });

module.exports = flowEnvioDiario;
