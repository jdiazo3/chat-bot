const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const { getUserData, notificarPedido } = require('./basededatos.js');
const RUTAARCHIVO = process.env.RUTAARCHIVO
// Ruta del archivo Excel
const filePath = path.resolve(RUTAARCHIVO+'/Clientes.xlsx');

/**
 * Asegura que el directorio donde se guardará el archivo Excel existe.
 * 
 * @param {string} dirPath - La ruta del directorio a crear si no existe.
 */
function ensureDirectoryExistence(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

/**
 * Guarda una lista de pedidos en un archivo Excel, sobrescribiendo el
 * archivo si ya existe.
 */
async function guardarPedidoEnExcel() {
    try {
        const pedidos = await getUserData();

        // Aseguramos que el directorio exista
        ensureDirectoryExistence(path.dirname(filePath));

        // Creamos un nuevo libro de trabajo de Excel
        let workbook = xlsx.utils.book_new();

        // Añadimos una hoja de cálculo con el encabezado
        let worksheet = xlsx.utils.aoa_to_sheet([
            ["ID", "Producto", "Nombre", "Dirección", "Teléfono", "Talla", "Color", "Whatsapp", "Fecha", "Estado","# de guia"]
        ]);

        // Añadimos los pedidos a la hoja de cálculo
        pedidos.forEach(pedido => {
            xlsx.utils.sheet_add_aoa(worksheet, [[
                pedido.id,
                pedido.producto,
                pedido.nombre,
                pedido.direccion,
                pedido.numero_contacto,
                pedido.talla,
                pedido.color,
                pedido.numero_whatsapp,
                pedido.fecha,
                pedido.estado
            ]], { origin: -1 });  // Usamos { origin: -1 } para añadir las filas al final
        });

        // Añadimos la hoja de trabajo al libro
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Pedidos');

        // Guardamos el libro de trabajo como archivo Excel
        xlsx.writeFile(workbook, filePath);

        console.log('Pedidos guardados en el archivo Excel');

        // Suponiendo que `notificarPedido` se encarga de notificar cada pedido
        pedidos.forEach(pedido => {
            notificarPedido(pedido.id);
        });

    } catch (error) {
        console.error('Error al guardar pedidos en Excel:', error);
    }
}

module.exports = { guardarPedidoEnExcel };