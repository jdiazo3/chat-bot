DROP DATABASE  chatbot;
CREATE DATABASE chatbot;

use chatbot;

create table pedido (
id bigint not null auto_increment,
producto varchar(100),
nombre varchar(100),
direccion varchar(100),
numero_contacto varchar(20),
talla varchar(4),
color varchar(10),
numero_whatsapp varchar(20),
fecha varchar(10),
notificado TINYINT(1),
estado varchar(30),
primary key (id)) engine=InnoDB;