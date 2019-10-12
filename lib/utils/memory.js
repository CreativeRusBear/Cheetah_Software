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

/**
 * @summary get stats about memory
 * @return {Promise<Systeminformation.MemData>}
 */
async function memStats () {
	return await si.mem();
}

/**
 * @summary get detail inforamtion about memory
 * @return {Promise<Systeminformation.MemLayoutData>}
 */
async function memInfo () {
	return await si.memLayout();
}

module.exports = {
	memStats,
	memInfo,
};
