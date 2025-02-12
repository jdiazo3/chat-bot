const schedule = require('node-schedule');

// Fecha y horario específico en el que deseas ejecutar la tarea
const someDate = new Date('2025-02-10T23:20:00.000+05:30');

// Programar la tarea para esa fecha y hora
schedule.scheduleJob(someDate, () => {
    console.log("El evento ha pasado");
});