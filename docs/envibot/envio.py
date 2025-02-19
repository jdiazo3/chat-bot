from time import sleep
import time
import pandas as pd
import pyautogui as pg
import webbrowser as web
import gdown  # Para descargar archivos de Google Drive
from mysql.connector import connection, Error  # Importar Error correctamente

# Conectar a la base de datos
db_connection = connection.MySQLConnection(
    user='root', password='',
    host='127.0.0.1',
    database='chatbot'
)

if db_connection.is_connected():
    cursor = db_connection.cursor()  # Crear cursor solo si hay conexión

# Verificar conexión antes de continuar
if db_connection:
    # Descargar archivo de Google Drive
    file_id = "1bG__lZv5lnfO1cNr2uyclvKuFc1FGq1q"
    url = f"https://drive.google.com/uc?id={file_id}"
    output = "Pedidos.xlsx"

    print("Descargando archivo de Google Drive...")
    gdown.download(url, output, quiet=False)

    # Leer archivo Excel
    try:
        data = pd.read_excel(output, sheet_name='Pedidos')
        print("Archivo leído con éxito.")
    except Exception as e:
        print(f"Error al leer el archivo: {e}")
        db_connection.close()
        exit()

    # Función para enviar mensajes por WhatsApp
    def enviar(mensaje, celu):
        web.open("https://web.whatsapp.com/send?phone=" + celu + "&text=" + mensaje)
        time.sleep(10)  # Espera a que cargue WhatsApp Web
        pg.press('enter')
        time.sleep(4)
        pg.hotkey('ctrl', 'w')  # Cierra la pestaña

    # Enviar mensajes y actualizar base de datos
    for i in range(len(data)):
        celular = "+" + str(data.loc[i, 'Whatsapp'])  # Convertir a string
        tipoMensaje = str(data.loc[i, '# de guia'])  # Asegurar que es string
        record_id = int(data.loc[i, 'ID'])  # Convertir a int normal

        tipoMensaje_base = (
            "https://interrapidisimo.com/sigue-tu-envio/ %0A%0A"
            "☝🏻 Ingresa a este enlace y escribe el número de la guía para ver el estado de tu pedido. %0A%0A"
        )

        mensaje = tipoMensaje_base + "Tu número de guía es: " + tipoMensaje

        enviar(mensaje, celular)

        # Asegurar que la conexión sigue activa antes de ejecutar el query
        if db_connection.is_connected():
            try:
                update_query = """
                    UPDATE pedido 
                    SET estado = 'NOTIFICADO_GUIA', 
                        numero_guia = %s, 
                        fecha_envio_guia = CURDATE()
                    WHERE id = %s
                """
                cursor.execute(update_query, (tipoMensaje, record_id))
                db_connection.commit()
                cursor.execute(update_query, (tipoMensaje, record_id))
                db_connection.commit()
                print(f"Pedido {record_id} actualizado correctamente.")
            except Error as e:
                print(f"Error al actualizar pedido {record_id}: {e}")
        else:
            print("La conexión a la base de datos se cerró inesperadamente.")

        time.sleep(3)

    # Cerrar conexión
    cursor.close()
    db_connection.close()
    print("Conexión cerrada.")
