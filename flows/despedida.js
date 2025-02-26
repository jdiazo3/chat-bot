// flowDespedida.js

const { addKeyword } = require('@bot-whatsapp/bot');
const messages = require('./enums/mensajes.js');
const { v4: uuidv4 } = require('uuid');
const ramdomString = uuidv4();


const flowDespedida = addKeyword(ramdomString)
    .addAnswer(messages.agradecimiento);

module.exports = flowDespedida;