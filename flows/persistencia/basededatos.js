const mysql = require('mysql2');
const {  ChatbotStates } = require('../enums/enums.js');

/**
 * Setup de conexión a la base de datos MySQL.
 */
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chatbot'
});

/**
 * Función para recuperar datos de la base de datos.
 */
function getUserData() {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM pedido where estado = 'PENDIENTE_COMPRA_DROPI' and notificado = 0`;
        
        connection.query(query, (err, results)  => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
    });
}
function getPedidoData(id) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM pedido where estado = 'PENDIENTE_COMPRA_DROPI' and notificado = 0 and id =?`;
        const values = [id];
        connection.query(query,values, (err, results)  => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
    });
}

/**
 * Función para insertar datos en la tabla de pedidos.
 * 
 * @param {string} nombre - El nombre del cliente.
 * @param {string} direccion - La dirección del cliente.
 * @param {string} telefono - El número de teléfono del cliente.
 * @param {string} talla - La talla del pedido.
 * @param {string} color - El color del pedido.
 * @returns {Promise<void>} - Una promesa que resuelve si el insert tiene éxito.
 */


function insertPedido(producto,nombre, direccion, numero_contacto, talla, color,numero_whatsapp,estado) {
    return new Promise((resolve, reject) => {
        const date = new Date();
        const isoString = date.toLocaleString('sv-SE').replace('T', ' '); // Formato "YYYY-MM-DD HH:MM:SS"
        console.log(isoString);
        const query = `INSERT INTO pedido (producto,nombre, direccion, numero_contacto, talla, color,numero_whatsapp,fecha,estado,notificado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [producto,nombre, direccion, numero_contacto, talla, color,numero_whatsapp,isoString,estado,0];
        
        connection.query(query, values, (err, results) => {
            if (err) {
                console.error('Error al insertar el pedido:', err);
                return reject(err);
            } else {
                console.log('Pedido insertado con éxito:', results);
                return resolve(results);
            }
        });
    });
}
function cancelarPedido(idPedido) {
    return new Promise((resolve, reject) => {
        const date = new Date();
        const isoString = date.toLocaleString('sv-SE').replace('T', ' '); // Formato "YYYY-MM-DD HH:MM:SS"
        console.log(isoString);
        const query = `UPDATE pedido SET estado = ?, notificado = ?,fecha_cancelacion = ? WHERE id = ?`;
        const values = [ChatbotStates.CANCELADO, 0,isoString, idPedido];
        
        connection.query(query, values, (err, results) => {
            if (err) {
                console.error('Error al cancelar el pedido:', err);
                return reject(err);
            } else if (results.affectedRows === 0) {
                console.warn('No se encontró un pedido con el ID proporcionado.');
                return reject(new Error('Pedido no encontrado.'));
            } else {
                console.log('Pedido cancelado con éxito:', results);
                return resolve(results);
            }
        });
    });
}
function notificarPedido(idPedido) {
    return new Promise((resolve, reject) => {
        const date = new Date();
        const isoString = date.toLocaleString('sv-SE').replace('T', ' '); // Formato "YYYY-MM-DD HH:MM:SS"
        console.log(isoString);
        const query = `UPDATE pedido SET estado = ? , notificado = ?, fecha_notificado = ? WHERE id = ?`;
        const values = [ChatbotStates.PENDIENTE_NOTIFICACION_GUIA, 1,isoString, idPedido];
        
        connection.query(query, values, (err, results) => {
            if (err) {
                console.error('Error al MODIFICAR el pedido:', err);
                return reject(err);
            } else if (results.affectedRows === 0) {
                console.warn('No se encontró un pedido con el ID proporcionado.');
                return reject(new Error('Pedido no encontrado.'));
            } else {
                console.log('Pedido modificado con éxito:', results);
                return resolve(results);
            }
        });
    });
}


module.exports = { getUserData, insertPedido,cancelarPedido,notificarPedido,getPedidoData};