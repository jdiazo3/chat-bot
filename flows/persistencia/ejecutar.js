const { exec } = require('child_process');
const path = require('path');

async function runExecutable() {
    return new Promise((resolve, reject) => {
        const scriptPath = path.resolve(__dirname, '../../docs/envibot/envio.py');

        exec('py --version', (error, stdout, stderr) => {
            console.log("Versión de Python detectada:", stdout || stderr);
        });

        exec(`py ${scriptPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error ejecutando el script: ${error.message}`);
                return;
            }

            if (stderr) {
                console.error(`Error en la ejecución: ${stderr}`);
                return;
            }

            console.log(`Salida del script: ${stdout}`);
            return;
        });
    });
}

module.exports = { runExecutable };
