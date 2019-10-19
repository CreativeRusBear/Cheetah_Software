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
 * @summary Convert from bytes to megabytes
 * @param data
 * @param fixed
 * @param showSizeTitle
 * @returns {*}
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
 * @summary Convert from bytes to gigabytes
 * @param data
 * @param fixed
 * @param showSizeTitle
 * @returns {*}
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
 * @summary Convert from kilobytes to megabytes
 * @param data
 * @param fixed
 * @param showSizeTitle
 * @returns {*}
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

module.exports = {
	convertFromBToMb,
	convertFromBToGb,
	convertFromKbToMb,
};
