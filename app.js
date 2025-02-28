const express = require('express');
const path = require('path');

const { createBot, createProvider, createFlow } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

const flowMenu = require('./flows/menu.js');
const flowPrincipal = require('./flows/principal.js');
const flowCompra = require('./flows/opcionesMenu/compra.js');
const flowCancelacion = require('./flows/opcionesMenu/cancelacion.js');     
const flowEnvioDiario = require('./flows/opcionesMenu/envioDiario.js');
const flowGuia = require('./flows/opcionesMenu/envioGuia.js');
const flowDespedida = require('./flows/despedida.js');
const flowTallas = require('./flows/opcionesMenu/tallas.js');
const flowMaterialCinturillaSola = require('./flows/opcionesMenu/materialCinturillaSola.js');
const flowCinturillaSola = require('./flows/opcionesMenu/cinturillaSola');
const flowCinturillaChaleco = require('./flows/opcionesMenu/cinturillaChaleco.js');

const app = express();
const PORT = process.env.PORT || 3003;

// Servir archivos estáticos desde la carpeta "public"
app.use('/docs', express.static(path.join(__dirname, 'docs')));

// Ruta de prueba para verificar que el servidor funciona
app.get('/', (req, res) => {
    res.send('Servidor de archivos funcionando correctamente.');
});

// Iniciar Express en paralelo al bot
app.listen(PORT, () => {
    console.log(`Servidor de archivos corriendo en http://localhost:${PORT}`);
});

/**************** Main Bot ***********************/
const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([
        flowEnvioDiario, flowPrincipal, flowDespedida, flowCompra, flowCancelacion,
        flowMenu, flowGuia, flowTallas, flowMaterialCinturillaSola, flowCinturillaSola, flowCinturillaChaleco
    ]); 
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();
