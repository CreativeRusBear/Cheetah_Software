/*
 *  $$$$$$\                                                      $$\
 * $$  __$$\                                                    $$ |
 * $$ /  \__| $$$$$$\  $$$$$$$\ $$\    $$\  $$$$$$\   $$$$$$\ $$$$$$\    $$$$$$\   $$$$$$\
 * $$ |      $$  __$$\ $$  __$$\\$$\  $$  |$$  __$$\ $$  __$$\\_$$  _|  $$  __$$\ $$  __$$\
 * $$ |      $$ /  $$ |$$ |  $$ |\$$\$$  / $$$$$$$$ |$$ |  \__| $$ |    $$$$$$$$ |$$ |  \__|
 * $$ |  $$\ $$ |  $$ |$$ |  $$ | \$$$  /  $$   ____|$$ |       $$ |$$\ $$   ____|$$ |
 * \$$$$$$  |\$$$$$$  |$$ |  $$ |  \$  /   \$$$$$$$\ $$ |       \$$$$  |\$$$$$$$\ $$ |
 *  \______/  \______/ \__|  \__|   \_/     \_______|\__|        \____/  \_______|\__|
 */

/**
 * @function
 * @description Convert from bytes to megabytes
 * @param {Object|Number} data - Value, that needs to convert
 * @param {Boolean} fixed - Set fixed size after dot
 * @param {Boolean} showSizeTitle - Set `MB` for convert data
 * @return {*} - converted value to `MB`
 */
function convertFromBToMb (data, fixed, showSizeTitle) {
	if (data.constructor === Object) {
		for (const prop in data) {
			data[prop] = fixed ?
				(data[prop]/1024**2).toFixed(2) :
				data[prop]/1024**2;
			if (showSizeTitle) data[prop] += ' Mb';
		}
	}
	if (data.constructor === Number) {
		data = fixed ? (data/1024**2).toFixed(2) : data/1024**2;
		if (showSizeTitle) data += ' Mb';
	}
	return data;
}


/**
 * @function
 * @description Convert from bytes to gigabytes
 * @param {Object|Number} data - Value, that needs to convert
 * @param {Boolean} fixed - Set fixed size after dot
 * @param {Boolean} showSizeTitle - Set `GB` for convert data
 * @return {*} - converted value to `GB`
 */
function convertFromBToGb (data, fixed, showSizeTitle) {
	if (data.constructor === Object) {
		for (const prop in data) {
			data[prop] = fixed ?
				(data[prop]/1024**3).toFixed(2) :
				data[prop]/1024**3;
			if (showSizeTitle) data[prop] += ' Gb';
		}
	}
	if (data.constructor === Number) {
		data = fixed ? (data/1024**3).toFixed(2) : data/1024**3;
		if (showSizeTitle) data += ' Gb';
	}
	return data;
}


/**
 * @function
 * @description Convert from kilobytes to megabytes
 * @param {Object|Number} data - value, that needs to convert
 * @param {Boolean} fixed - Set fixed size after dot
 * @param {Boolean} showSizeTitle - Set `MB` for convert data
 * @return {*} - converted value to `MB`
 */
function convertFromKbToMb (data, fixed, showSizeTitle) {
	if (data.constructor === Object) {
		for (const prop in data) {
			data[prop] = fixed ?
				(data[prop]/1024).toFixed(2) :
				data[prop]/1024;
			if (showSizeTitle) data[prop] += ' Mb';
		}
	}
	if (data.constructor === Number) {
		data = fixed ? (data/1024).toFixed(2) : data/1024;
		if (showSizeTitle) data += ' Mb';
	}
	return data;
}

/**
 * @description Module, that allows convert something values
 * @module /lib/utils/converter
 * @type {Object}
 */
module.exports = {
	convertFromBToMb,
	convertFromBToGb,
	convertFromKbToMb,
};
