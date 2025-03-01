DROP DATABASE IF EXISTS chatbot;
CREATE DATABASE chatbot;

CREATE TABLE pedido (
    id BIGSERIAL PRIMARY KEY,
    producto VARCHAR(100),
    nombre VARCHAR(100),
    direccion VARCHAR(100),
    numero_contacto VARCHAR(20),
    talla VARCHAR(4),
    color VARCHAR(10),
    numero_whatsapp VARCHAR(20),
    fecha TIMESTAMP,
    fecha_cancelacion TIMESTAMP,
    notificado BOOLEAN,
    fecha_notificado TIMESTAMP,
    estado VARCHAR(30),
    fecha_envio_guia TIMESTAMP,
    numero_guia VARCHAR(50)
);

-- Establecer la secuencia para que comience desde 10
ALTER SEQUENCE pedido_id_seq RESTART WITH 10;