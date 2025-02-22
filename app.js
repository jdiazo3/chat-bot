const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
const flowMenu = require('./flows/menu.js');
const flowPrincipal = require('./flows/principal.js');
const flowCompra =  require('./flows/opcionesMenu/compra.js');
const flowCancelacion = require('./flows/opcionesMenu/cancelacion.js');     
const flowEnvioDiario = require('./flows/opcionesMenu/envioDiario.js');
const flowGuia = require('./flows/opcionesMenu/envioGuia.js');
const flowDespedida = require('./flows/despedida.js');


/**************** Main Bot ***********************/
const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowEnvioDiario,flowPrincipal,flowDespedida,flowCompra,flowCancelacion,flowMenu,flowGuia]); // Pasamos solo el flow principal
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();