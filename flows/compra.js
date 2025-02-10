const { addKeyword } = require('@bot-whatsapp/bot');
const guardarPedidoEnExcel = require('./saveExcel.js');
const messages = require('./mensajes.js');

const flowCompra = addKeyword('6', { sensitive: true })
    .addAnswer(messages.greetings)
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
                await guardarPedidoEnExcel(state.getMyState());
                await flowDynamic(messages.thankYou);
            } catch (error) {
                console.error('Error al guardar el pedido:', error);
                await flowDynamic(messages.errorSaving);
            }
        } else {
            await flowDynamic(messages.incorrectResponse);
        }
    });

module.exports = flowCompra;