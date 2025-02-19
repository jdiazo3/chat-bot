const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const messages = require('../enums/mensajes.js');
const { insertPedido} = require('../persistencia/basededatos.js');
const { ChatbotStates } = require('../enums/enums.js');
const { v4: uuidv4 } = require('uuid');
const ramdomString = uuidv4();
const reiniciar = addKeyword(EVENTS.ACTION).addAnswer('Vamos a empezar de nuevo. 📍 digita *5*');


const flowCompra = addKeyword(ramdomString)
    .addAnswer(messages.greetings)
    .addAnswer( messages.menucompra
        , { capture: true }, async (ctx, { state,fallBack }) => {
            if (!['1','2'].includes(ctx.body.toLowerCase())) {
                return fallBack(messages.cancelacionFallback);
            }
            await state.update({ producto: ctx.body });
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
    .addAnswer(messages.askSize, { capture: true }, async (ctx, { state,fallBack }) => {
        if (!['xs', 's', 'm', 'l', 'xl', '2xl', '3xl'].includes(ctx.body.toLowerCase())) {
                            return fallBack(messages.tallaFallback);
                        }
        await state.update({ talla: ctx.body });
        console.log('Talla capturada:', state.getMyState().talla);
    })
    .addAnswer(messages.askColor, { capture: true }, async (ctx, { state,fallBack, flowDynamic }) => {
        if (!['negro', 'beige'].includes(ctx.body.toLowerCase())) {
                    return fallBack(messages.colorFallback);
                }
        await state.update({ color: ctx.body });
        console.log('Color capturado:', state.getMyState().color);
        console.log('Datos completos del pedido:', state.getMyState());

        await flowDynamic(`📝 *Resumen de tu pedido:* 
        📦 Producto: ${state.getMyState().producto==='1'?'CINTURILLA SOLA':'CINTURILLA CHALECO'} 
        📍 Nombre: ${state.getMyState().nombre} 
        🏠 Dirección: ${state.getMyState().direccion} 
        📲 Teléfono: ${state.getMyState().telefono} 
        📏 Talla: ${state.getMyState().talla} 
        🎨 Color: ${state.getMyState().color}`);
    })
    .addAnswer(messages.confirmOrder, { capture: true }, async (ctx, { state,fallBack, gotoFlow,  flowDynamic }) => {
        const choice = ctx.body ? ctx.body.trim() : '';
        if (!['1', '2'].includes(choice)) {
            return fallBack(messages.confirmOrder);
        }
        if (choice === '2') {
            state = null;
            return gotoFlow(reiniciar);
        } else if (choice === '1') {
            try {
                try {
                    if(state.getMyState().producto ==='1'){
                        await state.update({ producto:'CINTURILLA_SOLA' });
                    }else{
                        await state.update({ producto:'CINTURILLA_CHALECO' });
                    }
                    const userData = await insertPedido(state.getMyState().producto,state.getMyState().nombre,state.getMyState().direccion,
                    state.getMyState().telefono,state.getMyState().talla,state.getMyState().color,
                    state.getMyState().numeroWhat,ChatbotStates.PENDIENTE_COMPRA_DROPI); // Llama a la función y maneja el resultado
                    if (userData) {
                        await flowDynamic(`Tu id de pedido es: *${userData.insertId}*`);
                        await flowDynamic(messages.thankYou);
                        console.log('Datos de pedido insertados:', userData);
                    }
                } catch (error) {
                    console.error('Error al insertar datos de la base de datos:', error);
                }
            } catch (error) {
                console.error('Error al guardar el pedido:', error);
                await flowDynamic(messages.errorSaving);
            }
        } 
    }).addAnswer(messages.furtherAssistance, { capture: true }, async (ctx, { fallBack, flowDynamic }) => {
                    if (!['si', 'no'].includes(ctx.body.toLowerCase())) {
                                return fallBack(messages.colorFallback);
                            }
                        });
// Exportar el objeto directamente
module.exports = flowCompra;