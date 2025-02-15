const { addKeyword } = require('@bot-whatsapp/bot'); 
const messages = require('../enums/mensajes.js');
const axios = require('axios');
const path = require('path');
const XLSX = require('xlsx');
const {runExecutable} = require('../persistencia/ejecutar.js');

const pdfPath = path.resolve(__dirname, '../../docs/envibot/Guias.xlsx');

const flowGuia = addKeyword('juandiaz02', { sensitive: true })
                .addAnswer(messages.uploadFile, { capture: true }, async (ctx, {  flowDynamic }) => {
                    console.log("Archivo recibido:", ctx);
                    await runExecutable();
                    await flowDynamic('Se enviaron las guias');
                });

module.exports = flowGuia;