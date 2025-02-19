// flowDespedida.js

const { addKeyword } = require('@bot-whatsapp/bot');
const messages = require('./enums/mensajes.js');



const flowDespedida = addKeyword(['No','no','NO','nO','Gracias'], { sensitive: true })
    .addAnswer(messages.agradecimiento);

module.exports = flowDespedida;