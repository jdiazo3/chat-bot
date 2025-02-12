const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Ruta del archivo ExcelC:\Users\juand\OneDrive
const filePath = path.join('C:', 'Users', 'juand', 'OneDrive', 'pedidos.xlsx');
// Función para guardar el pedido en el archivo Excel
async function guardarPedidoEnExcel(pedido) {
  let workbook;
  
  // Verificamos si el archivo ya existe
  if (fs.existsSync(filePath)) {
    // Si existe, leemos el libro de trabajo
    workbook = xlsx.readFile(filePath);
  } else {
    // Si no existe, creamos un nuevo libro de trabajo
    workbook = xlsx.utils.book_new();
  }
  
  // Obtenemos la hoja de trabajo, si no existe la creamos
  let worksheet;
  if (workbook.SheetNames.length) {
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
  } else {
    worksheet = xlsx.utils.aoa_to_sheet([["Nombre", "Dirección", "Teléfono", "Talla", "Color","Whatsapp"]]);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Pedidos');
  }

  // Convertimos la hoja a un rango de objetos JSON para modificarla fácilmente
  let orders = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
  
  // Añadimos el nuevo pedido
  orders.push([pedido.nombre, pedido.direccion, pedido.telefono, pedido.talla, pedido.color,pedido.numeroWhat]);

  // Convertimos el rango de objetos JSON de vuelta a una hoja de trabajo
  worksheet = xlsx.utils.aoa_to_sheet(orders);
  workbook.Sheets[workbook.SheetNames[0]] = worksheet;
  
  // Guardamos el libro de trabajo de nuevo como archivo Excel
  xlsx.writeFile(workbook, filePath);

  console.log('Pedido guardado en archivo Excel');
}


module.exports = guardarPedidoEnExcel;