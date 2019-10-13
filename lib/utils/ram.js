/**
 * /'\_/`\
 * /\      \     __    ___ ___     ___   _ __   __  __
 * \ \ \__\ \  /'__`\/' __` __`\  / __`\/\`'__\/\ \/\ \
 *  \ \ \_/\ \/\  __//\ \/\ \/\ \/\ \L\ \ \ \/ \ \ \_\ \
 *   \ \_\\ \_\ \____\ \_\ \_\ \_\ \____/\ \_\  \/`____ \
 *    \/_/ \/_/\/____/\/_/\/_/\/_/\/___/  \/_/   `/___/> \
 *                                                  /\___/
 *                                                  \/__/
 */


const si = require('systeminformation');
const converter = require('./converter');


/**
 * @summary get stats about memory
 * @return {Promise<Systeminformation.MemData>}
 */

async function memStats () {
	const data = converter.convertFromBToGb(await si.mem(), true);
	for (const item of Object.keys(data)) {
		data[item]+=' Gb';
	}
	return data;
}


/**
 * @summary get detail information about memory
 * @return {Promise<Systeminformation.MemLayoutData>}
 */

async function memInfo () {
	const data = await si.memLayout();
	data.forEach(mem => {
		mem.size = mem.size
			? `${converter.convertFromBToGb(parseInt(mem.size), true)} Gb`
			: '';
	});
	return data;
}

module.exports = {
	memStats,
	memInfo,
};
