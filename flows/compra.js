const { addKeyword } = require('@bot-whatsapp/bot');
//const guardarPedidoEnExcel = require('./saveExcel.js');
const messages = require('./mensajes.js');
const { insertPedido} = require('./basededatos.js');
const { ChatbotStates } = require('./enums');

const flowCompra = addKeyword('6', { sensitive: true })
    .addAnswer(messages.greetings)
    .addAnswer( '1 para comprar la cinturilla sola\n'+
        '2 para comprar la cinturilla con chaleco\n'+
        'Digita el numero de tu preferencia segun el producto que vas a comprar'
        , { capture: true }, async (ctx, { state }) => {
            await state.update({ producto: ctx.body });
        console.log('Nombre capturado:', state.getMyState().nombre);
    })
    .addAnswer(messages.askName, { capture: true }, async (ctx, { state }) => {
        await state.update({ numeroWhat: ctx?.key?.remoteJid?.split('@')[0] });
        await state.update({ nombre: ctx.body });
        console.log('Nombre capturado:', state.getMyState().nombre);
    })
    .addAnswer(messages.askAddress, { capture: true }, async (ctx, { state }) => {
        await state.update({ direccion: ctx.body });
        console.log('Dirección capturada:', state.getMyState().direccion);
    })
    .addAnswer(messages.askPhone, { capture: true }, async (ctx, { state }) => {
        await state.update({ telefono: ctx.body });
        console.log('Teléfono capturado:', state.getMyState().telefono);
    })
    .addAnswer(messages.askSize, { capture: true }, async (ctx, { state }) => {
        await state.update({ talla: ctx.body });
        console.log('Talla capturada:', state.getMyState().talla);
    })
    .addAnswer(messages.askColor, { capture: true }, async (ctx, { state, flowDynamic }) => {
        await state.update({ color: ctx.body });
        console.log('Color capturado:', state.getMyState().color);
        console.log('Datos completos del pedido:', state.getMyState());

        await flowDynamic(`📝 *Resumen de tu pedido:* 
        📍 Nombre: ${state.getMyState().nombre} 
        🏠 Dirección: ${state.getMyState().direccion} 
        📲 Teléfono: ${state.getMyState().telefono} 
        📏 Talla: ${state.getMyState().talla} 
        🎨 Color: ${state.getMyState().color}`);
    })
    .addAnswer(messages.confirmOrder, { capture: true }, async (ctx, { state, flowDynamic }) => {
        const choice = ctx.body ? ctx.body.trim() : '';

        if (choice === '2') {
            state = null;
            await flowDynamic('Vamos a empezar de nuevo. 📍 digita *6*');
        } else if (choice === '1') {
            try {
                try {
                    const userData = await insertPedido(state.getMyState().producto ='1'?'CINTURILLA_SOLA':'CINTURILLA_CHALECO',state.getMyState().nombre,state.getMyState().direccion,
                    state.getMyState().telefono,state.getMyState().talla,state.getMyState().color,
                    state.getMyState().numeroWhat,ChatbotStates.PENDIENTE_COMPRA_DROPI); // Llama a la función y maneja el resultado
                    if (userData) {
                        await flowDynamic(`Tu id de pedido es: *${userData.insertId}*`);
                        console.log('Datos de pedido insertados:', userData);
                    }
                } catch (error) {
                    console.error('Error al insertar datos de la base de datos:', error);
                }
                await flowDynamic(messages.thankYou);
            } catch (error) {
                console.error('Error al guardar el pedido:', error);
                await flowDynamic(messages.errorSaving);
            }
        } else {
            await flowDynamic(messages.incorrectResponse);
        }
    });
// Exportar el objeto directamente
module.exports = flowCompra;