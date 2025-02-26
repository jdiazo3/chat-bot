const { addKeyword, EVENTS  } = require('@bot-whatsapp/bot');
const { getUserData,cancelarPedido,getPedidoData } = require('../persistencia/basededatos.js');
const messages = require('../enums/mensajes.js');
const { v4: uuidv4 } = require('uuid');
const ramdomString = uuidv4();
const flowMenu = require('../menu.js');
/*flujo cancelación*/

const flowCancelacion = addKeyword(ramdomString)
    .addAnswer('Para iniciar la cancelación de tu pedido, ingresa los siguientes datos uno por uno.')
    .addAnswer('Por favor, ingresa el ID de tu pedido:', { capture: true }, async (ctx, { state }) => {
        await state.update({ idPedido: ctx.body });
        console.log('ID del pedido capturado:', state.getMyState().idPedido);
    })

    .addAnswer('Ingresa el numero del producto que solicitaste en la compra:\n\n'+
                '1️⃣ Cinturilla 13 varillas Sola\n'+
                '2️⃣ Cinturilla 13 varillas con Chaleco\n', { capture: true }, async (ctx, { state,fallBack }) => {
                    if (!['1', '2'].includes(ctx.body)) {
                        return fallBack(messages.menuFallback);
            }
        await state.update({ producto: ctx.body });
        console.log('Producto capturado:', state.getMyState().producto);
    })
    .addAnswer('Ingresa el nombre como lo ingresaste cuando hiciste la compra:', { capture: true }, async (ctx, { state }) => {
        await state.update({ nombre: ctx.body });
        console.log('Nombre capturado:', state.getMyState().nombre);
    })
    .addAnswer('Ingresa tu dirección como la ingresaste cuando hiciste la compra:', { capture: true }, async (ctx, { state }) => {
        await state.update({ direccion: ctx.body });
        console.log('Dirección capturada:', state.getMyState().direccion);
    })
    .addAnswer('Ingresa tu teléfono como lo ingresaste cuando hiciste la compra:', { capture: true }, async (ctx, { state }) => {
        await state.update({ telefono: ctx.body });
        console.log('Teléfono capturado:', state.getMyState().telefono);
    })
    .addAnswer('Ingresa la talla que enviaste como la ingresaste cuando hiciste la compra:', { capture: true }, async (ctx, { state,fallBack }) => {
                if (!['xs', 's', 'm', 'l', 'xl', '2xl', '3xl'].includes(ctx.body.toLowerCase())) {
                    return fallBack(messages.tallaFallback);
                }
        await state.update({ talla: ctx.body });
        console.log('Talla capturada:', state.getMyState().talla);
    })
    .addAnswer('Ingresa el color que enviaste como lo ingresaste cuando hiciste la compra:', { capture: true }, async (ctx, { state,fallBack, flowDynamic }) => {
        if (!['negro', 'beige'].includes(ctx.body.toLowerCase())) {
            return fallBack(messages.colorFallback);
        }
        await state.update({ color: ctx.body });
        console.log('Color capturado:', state.getMyState().color);
        
        await flowDynamic(`📝 *Datos del pedido a cancelar:* 
        📍 ID del pedido: ${state.getMyState().idPedido} 
        📦 Producto: ${state.getMyState().producto==='1'?'CINTURILLA SOLA':'CINTURILLA CHALECO'} 
        📍 Nombre: ${state.getMyState().nombre} 
        🏠 Dirección: ${state.getMyState().direccion} 
        📲 Teléfono: ${state.getMyState().telefono} 
        📏 Talla: ${state.getMyState().talla} 
        🎨 Color: ${state.getMyState().color}`);
        
        await flowDynamic('Si estos datos son correctos...');
    })
    .addAnswer('digita *1* para confirmar la cancelación o *2* para cancelar la operación.', { capture: true }, async (ctx, { state,fallBack, flowDynamic }) => {
        const choice = ctx.body.trim();
        if (!['1', '2'].includes(choice)) {
                    return fallBack(messages.menuFallback);
        }

        if (choice === '2') {
            state = null;
            await flowDynamic('Operación de cancelación detenida. Puedes iniciar de nuevo cuando lo desees digitando *7*.');
        } else if (choice === '1') {
            try {
                const validacionExitosa = await validarDatosPedido(state);
                if (validacionExitosa) {
                    const cancelResult = await cancelarPedido(state.getMyState().idPedido); // Asume que esta función maneja la cancelación en la base de datos
                    if (cancelResult) {
                        await flowDynamic(`Tu pedido con ID *${state.getMyState().idPedido}* ha sido cancelado exitosamente.`);
                        console.log('Cancelación exitosa:', cancelResult);
                    }else{
                        await flowDynamic(`Tu pedido *NO* ha sido cancelado, debido a que la informacion suministrada no concuerda.`);
                    }
                }else{
                    await flowDynamic('La información ingresada no coincide con el pedido, por favor verifica los datos.');
                } 
            } catch (error) {
                console.error('Error al cancelar el pedido:', error);
                await flowDynamic('Error al cancelar tu pedido, por favor intenta más tarde o contacta soporte.');
            }
        }
    }).addAnswer(messages.furtherAssistance, { capture: true }, async (ctx, { gotoFlow,fallBack, flowDynamic }) => {
                   if (!['si', 'no'].includes(ctx.body.toLowerCase())) {
                               return fallBack(messages.colorFallback);
                           }
                           console.log('antes del si');
                           if('si'===ctx.body.toLowerCase()){
                               console.log('entro al si');
                               return gotoFlow(require('../menu.js'));
                           }else{
                               console.log('entro al else');
                               return gotoFlow(require('../despedida.js'));
                           }
                       });

    async function validarDatosPedido(state) {
        try {
            const datosUsuario = {
            producto: state.getMyState().producto,
            nombre: state.getMyState().nombre,
            direccion: state.getMyState().direccion,
            telefono: state.getMyState().telefono,
            talla: state.getMyState().talla,
            color: state.getMyState().color,
            };

            // Fetch data from database
            const datosBDArray = await getPedidoData(state.getMyState().idPedido);
            console.log('datos de la base de datos', datosBDArray);

            // Check that you have valid database data
            if (!datosBDArray || datosBDArray.length === 0) {
                throw new Error('No se encontró el pedido en la base de datos.');
            }

            // Get the first element of the array since it contains a single record
            const datosBD = datosBDArray[0];

            // Rest of the comparison logic
            let allMatch = true;
            const productoBD = datosBD.producto === 'CINTURILLA_SOLA' ? '1' : '2'

            if (datosUsuario.producto !== productoBD) {
                console.log(`Discrepancia en producto. Usuario: ${datosUsuario.producto}, BD: ${productoBD}`);
                allMatch = false;
            }

            if (datosUsuario.nombre !== datosBD.nombre) {
                console.log(`Discrepancia en nombre. Usuario: ${datosUsuario.nombre}, BD: ${datosBD.nombre}`);
                allMatch = false;
            }

            if (datosUsuario.direccion !== datosBD.direccion) {
                console.log(`Discrepancia en dirección. Usuario: ${datosUsuario.direccion}, BD: ${datosBD.direccion}`);
                allMatch = false;
            }

            // Make sure to use `numero_contacto` for the telephone and `numero_whatsapp` as needed
            if (datosUsuario.telefono !== datosBD.numero_contacto) {
                console.log(`Discrepancia en teléfono. Usuario: ${datosUsuario.telefono}, BD: ${datosBD.numero_contacto}`);
                allMatch = false;
            }

            if (datosUsuario.talla !== datosBD.talla) {
                console.log(`Discrepancia en talla. Usuario: ${datosUsuario.talla}, BD: ${datosBD.talla}`);
                allMatch = false;
            }

            if (datosUsuario.color !== datosBD.color) {
                console.log(`Discrepancia en color. Usuario: ${datosUsuario.color}, BD: ${datosBD.color}`);
                allMatch = false;
            }

            if (!allMatch) {
                console.log('Al menos uno de los datos no coincide con la base de datos.');
                return false;
            }

            console.log('Todos los datos coinciden correctamente.');
            return true; // Indica que todos los datos coinciden
        } catch (error) {
            console.error('Error durante la validación:', error.message);
            return false; // Indica que hubo un error en la validación
        }
    }

module.exports = flowCancelacion;