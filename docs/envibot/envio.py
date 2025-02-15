from time import sleep
import time
import pandas as pd
import pyautogui as pg
import webbrowser as web
import gdown  # Para descargar archivos de Google Drive

# 🔹 ID del archivo de Google Drive
file_id = "1bG__lZv5lnfO1cNr2uyclvKuFc1FGq1q"
url = f"https://drive.google.com/uc?id={file_id}"
output = "Pedidos.xlsx"

# 🔹 Descargar el archivo
gdown.download(url, output, quiet=False)

# 🔹 Leer el archivo de Excel
data = pd.read_excel(output, sheet_name='Pedidos')

# 🔹 Función para enviar mensajes por WhatsApp
def enviar(mensaje, celu):
    web.open("https://web.whatsapp.com/send?phone=" + celu + "&text=" + mensaje)
    time.sleep(10)  # Espera a que cargue WhatsApp Web
    pg.press('enter')
    time.sleep(4)
    pg.hotkey('ctrl', 'w')  # Cerrar la pestaña de WhatsApp Web

# 🔹 Enviar mensajes a los clientes
for i in range(len(data)):
    celular = "+57" + str(data.loc[i, 'Celular'])  # Convertir a string
    tipoMensaje = data.loc[i, '# de guia']
    
    tipoMensaje_base = (
        "https://interrapidisimo.com/sigue-tu-envio/%0A%0A"
        "☝🏻 Ingresa a este enlace y escribe el número de la guía para ver el estado de tu pedido.%0A%0A"
    )
    
    mensaje = tipoMensaje_base + "Tu número de guía es: " + str(tipoMensaje)
    
    enviar(mensaje, celular)
    time.sleep(3)
