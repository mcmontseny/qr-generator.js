// Librería utilizada para la generación de los códigos QR:
// https://github.com/papnkukn/qrcode-svg
const QRCode = require("qrcode-svg");

// Constantes generales de configuración
const WIDTH = 256; // Ancho del código QR en píxeles
const HEIGHT = 256; // Altura del código QR en píxeles
const PADDING = 4; // Padding en espacios en blanco
const COLOR = '#000000'; // Color del QR (Nombre del color o hexadecimal)
const BACKGROUND = '#ffffff'; // Color de fondo (Nombre del color o hexadecimal)
const ECL = 'M'; // Nivel de corrección de errores (L,M,H,Q)
const OUTPUT_SRC = './output/'; // Directorio donde se guardaran los QR's
const FORMAT_FILE = '.svg'; // Solo funciona .svg (No modificar el valor)

// Objeto de configuración para el generador de QR'S
// Para más opciones de configuración revisar: 
// https://github.com/papnkukn/qrcode-svg#options
const generatorConf = {
	padding: PADDING,
	width: WIDTH,
	height: HEIGHT,
	color: COLOR,
	background: BACKGROUND,
	ecl: ECL
}

// Array de objetos con la información básica para generar los QR's
// Primera propiedad: Contenido del código QR
// Segunda propiedad: Nombre del fichero de salida
const qrList = [
	{ content: 'http://google.es/', outFileName: 'google' },
	{ content: 'http://amazon.es/', outFileName: 'amazon' },
	{ content: 'http://instagram.com/', outFileName: 'instagram' },
	{ content: 'http://nike.com/', outFileName: 'nike' }
];

/**
 * Función que recorre el array con los datos para generar los códigos qr
 * @param {any} qrList - Array con la información de generación de cada QR
 * @param {any} generatorConf - Objeto de configuración para el generador
 */
const qrCodeGenerator = (qrList, generatorConf) => {
	qrList.forEach(qr => {
		generateQR(qr, generatorConf);
	});
}

/**
 * Función que realiza la generación y el guardado del código QR generado
 * @param {any} qr - Elemento del listado - (Destructuring del objeto)
 * @param {any} generatorConf - Objeto de configuración para el generador
 */
const generateQR = ({ content, outFileName }, generatorConf) => {
	try {
		const qr = drawQR({ content, ...generatorConf });
		saveQR(qr, outFileName);
	} catch (err) {
		console.error('Error to generate or save QR code');
		console.error(err);
	}
}

/**
 * Función que genera el código QR a través de su contenido y objeto de configuración
 * En la llamada de la función se añade el campo content (Contenido QR) al objeto de configuración
 * 
 * @param {any} generatorConf - Objeto de configuración para el generador + contenido del QR
 * @returns {QRCode} - Objeto del tipo QRCode
 */
const drawQR = generatorConf => new QRCode(generatorConf);

/**
 * Función que guarda el código QR en el path indicado
 * Concatena el path de salida + nombre del fichero + extensión
 * 
 * @param {QRCode} qr - Objeto del tipo QRCode. (Contiene el QR ya generado)
 * @param {any} fileName - Nombre del fichero con el que guardaremos el QR
 */
const saveQR = (qr, fileName) => {
	const outPath = `${OUTPUT_SRC}${fileName}${FORMAT_FILE}`;
	qr.save(outPath, (error) => {
		if (error) throw error;
		console.log(`Done! QR generated. Saved in: ${outPath}`);
	});
}

// Llamada de la función inicial
qrCodeGenerator(qrList, generatorConf);
