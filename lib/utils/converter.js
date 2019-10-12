/**
 *  ____                                           __
 * /\  _`\                                        /\ \__
 * \ \ \/\_\    ___     ___   __  __     __   _ __\ \ ,_\    __   _ __
 *  \ \ \/_/_  / __`\ /' _ `\/\ \/\ \  /'__`\/\`'__\ \ \/  /'__`\/\`'__\
 *   \ \ \L\ \/\ \L\ \/\ \/\ \ \ \_/ |/\  __/\ \ \/ \ \ \_/\  __/\ \ \/
 *    \ \____/\ \____/\ \_\ \_\ \___/ \ \____\\ \_\  \ \__\ \____\\ \_\
 *     \/___/  \/___/  \/_/\/_/\/__/   \/____/ \/_/   \/__/\/____/ \/_/
 */






/**
 * @summary Convert from bytes to megabytes
 * @param data
 * @param fixed
 * @return {*}
 */
function convertFromBToMb (data, fixed) {
	if (data.constructor === Object) {
		for (const prop in data) {
			data[prop] = fixed ?
				(data[prop]/1024**2).toFixed(2) :
				data[prop]/1024**2;
		}
	}
	if (data.constructor === Number) {
		data = fixed ? (data/1024**2).toFixed(2) : data/1024**2;
	}
	return data;
}


/**
 * @summary Convert from bytes to gigabytes
 * @type {number}
 */
function convertFromBToGb (data, fixed) {
	if (data.constructor === Object) {
		for (const prop in data) {
			data[prop] = fixed ?
				(data[prop]/1024**3).toFixed(2) :
				data[prop]/1024**3;
		}
	}
	if (data.constructor === Number) {
		data = fixed ? (data/1024**3).toFixed(2) : data/1024**3;
	}
	return data;
}

module.exports={
	convertFromBToMb,
	convertFromBToGb,
};
