require('dotenv').config();
const { Pool } = require('pg');
const { ChatbotStates } = require('../enums/enums.js');

/**
 * Setup de conexión a la base de datos PostgreSQL.
 */
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false // Necesario para Render y conexiones seguras
    }
});

/**
 * Función para recuperar pedidos pendientes.
 */
function getUserData() {
    return pool.query(`SELECT * FROM pedido WHERE estado = 'PENDIENTE_COMPRA_DROPI' AND notificado = FALSE`)
        .then(res => res.rows)
        .catch(err => {
            console.error('Error al recuperar pedidos:', err);
            throw err;
        });
}

/**
 * Función para recuperar un pedido por ID.
 */
function getPedidoData(id) {
    return pool.query(`SELECT * FROM pedido WHERE estado = 'PENDIENTE_COMPRA_DROPI' AND notificado = FALSE AND id = $1`, [id])
        .then(res => res.rows)
        .catch(err => {
            console.error('Error al recuperar el pedido:', err);
            throw err;
        });
}

/**
 * Función para insertar un nuevo pedido.
 */
function insertPedido(producto, nombre, direccion, numero_contacto, talla, color, numero_whatsapp, estado) {
    const fecha = new Date().toISOString(); // Formato ISO "YYYY-MM-DDTHH:MM:SS.sssZ"
    
    const query = `
        INSERT INTO pedido (producto, nombre, direccion, numero_contacto, talla, color, numero_whatsapp, fecha, estado, notificado) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, FALSE)
        RETURNING *;
    `;

    const values = [producto, nombre, direccion, numero_contacto, talla, color, numero_whatsapp, fecha, estado];

    return pool.query(query, values)
        .then(res => {
            console.log('Pedido insertado con éxito:', res.rows[0]);
            return res.rows[0];
        })
        .catch(err => {
            console.error('Error al insertar el pedido:', err);
            throw err;
        });
}

/**
 * Función para cancelar un pedido.
 */
function cancelarPedido(idPedido) {
    const fecha = new Date().toISOString();

    const query = `
        UPDATE pedido 
        SET estado = $1, notificado = FALSE, fecha_cancelacion = $2 
        WHERE id = $3 
        RETURNING *;
    `;

    const values = [ChatbotStates.CANCELADO, fecha, idPedido];

    return pool.query(query, values)
        .then(res => {
            if (res.rowCount === 0) throw new Error('Pedido no encontrado.');
            console.log('Pedido cancelado con éxito:', res.rows[0]);
            return res.rows[0];
        })
        .catch(err => {
            console.error('Error al cancelar el pedido:', err);
            throw err;
        });
}

/**
 * Función para notificar un pedido.
 */
function notificarPedido(idPedido) {
    const fecha = new Date().toISOString();

    const query = `
        UPDATE pedido 
        SET estado = $1, notificado = TRUE, fecha_notificado = $2 
        WHERE id = $3 
        RETURNING *;
    `;

    const values = [ChatbotStates.PENDIENTE_NOTIFICACION_GUIA, fecha, idPedido];

    return pool.query(query, values)
        .then(res => {
            if (res.rowCount === 0) throw new Error('Pedido no encontrado.');
            console.log('Pedido notificado con éxito:', res.rows[0]);
            return res.rows[0];
        })
        .catch(err => {
            console.error('Error al notificar el pedido:', err);
            throw err;
        });
}

// Exportar funciones
module.exports = { getUserData, insertPedido, cancelarPedido, notificarPedido, getPedidoData };
