// Libreria utilizada para la generacion de los QR: 
// https://github.com/papnkukn/qrcode-svg
const QRCode = require("qrcode-svg");

// Constantes de configuración
const WIDTH = 256;
const HEIGHT = 256;
const PADDING = 4;
const COLOR = '#000000';
const BACKGROUND = '#000000';
const ECL = 'M';
const OUTPUT_SRC = './output/';
const FORMAT_FILE = '.svg';

// Objeto de configuración para el generador de QR'S
const generatorConf = {
	padding: PADDING,
	width: WIDTH,
	height: HEIGHT,
	color: COLOR,
	background: BACKGROUND,
	ecl: ECL
}

// Listado de objetos con la información basica para generar los qr's
// Cada objeto contiene la url donde apunta el QR + el nombre del fichero que se genera
const qrList = [
	{ src: 'https://google.es', outFileName: 'google'},
	{ src: 'https://amazon.es', outFileName: 'amazon'},
	{ src: 'https://instagram.com', outFileName: 'instagram'},
	{ src: 'https://nike.com', outFileName: 'nike'}
];

// Función que recorre un listado y genera códigos qr
const qrCodeGenerator = (qrList, generatorConf) => {
	qrList.forEach(qr => {
		generateQR(qr, generatorConf);
	});
}

// Función que realiza la generación y guarda el código qr generado
const generateQR = ({src: url, outFileName: fileName}, generatorConf) => {
	try {
		const qr = drawQR(url, generatorConf);
		saveQR(qr, fileName);
	} catch (err) {
		console.error('Error to generate or save QR code');
		console.error(err);
	}
}

// Función para dibujar el código qr
const drawQR = generatorConf => new QRCode(generatorConf);

// Función para guardar el código QR
const saveQR = (qr, fileName) => {
	const outPath = `${OUTPUT_SRC}${fileName}${FORMAT_FILE}`;
	qr.save(outPath, function (error) {
		if (error) throw error;
		console.log(`Done! QR generated. Saved in: ${outPath}`);
	});
}

// Función de inicio
qrCodeGenerator(qrList, generatorConf);
