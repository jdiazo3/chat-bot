const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
const flowMenu = require('./flows/menu.js');
const flowPrincipal = require('./flows/principal.js');
const flowCompra =  require('./flows/compra.js');
/**************** Main Bot ***********************/
const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal,flowCompra,
        flowMenu,addKeyword('any') // Captura cualquier entrada no válida
        .addAnswer('😕 Lo siento, no he entendido tu respuesta. Por favor, elige una opción válida entre 1 y 6.'),
    ]); // Pasamos solo el flow principal
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();
