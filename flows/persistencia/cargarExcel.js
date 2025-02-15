const axios = require('axios');
const fs = require('fs');
const XLSX = require('xlsx');
const path = require('path');

async function processExcel(url) {
    try {
        console.log(`Descargando archivo desde: ${url}`);

        // Descargar el archivo desde la URL
        const response = await axios.get(url, {
            responseType: 'arraybuffer' // Asegurar que obtenemos el archivo en formato binario
        });

        // Guardar el archivo temporalmente
        const filePath = path.resolve(__dirname, '../../docs/Envibot.xlsx');
        fs.writeFileSync(filePath, response.data);

        console.log('✅ Archivo descargado correctamente');

        // Leer el archivo con XLSX
        const workbook = XLSX.readFile(filePath, { type: 'buffer' });

        // Obtener la primera hoja del libro
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convertir la hoja a JSON
        const data = XLSX.utils.sheet_to_json(worksheet);

        console.log('📊 Datos del Excel:', data);
        return data;
    } catch (error) {
        console.error('❌ Error al procesar el archivo:', error);
    }
}
async function downloadFile(url) {
    try {
        console.log(`📥 Descargando archivo desde: ${url}`);

        // Descargar archivo como buffer binario
        const response = await axios.get(url, {
            responseType: 'arraybuffer'
        });

        // Obtener información del archivo
        const fileType = response.headers['content-type'];
        console.log(`📄 Tipo de archivo recibido: ${fileType}`);
        const filePath = path.resolve(__dirname, '../../docs/Envibot.xlsx');
        // Guardar archivo en la ruta especificada
        fs.writeFileSync(filePath, response.data);
        console.log(`✅ Archivo guardado en: ${filePath}`);

        // Verificar extensión correcta
        const ext = path.extname(filePath).toLowerCase();
        console.log(`📌 Extensión del archivo: ${ext}`);

        return filePath;
    } catch (error) {
        console.error('❌ Error al descargar el archivo:', error);
    }
}
module.exports = { processExcel,downloadFile };
