/**
 *  ____     ____    __  __
 * /\  _`\  /\  _`\ /\ \/\ \
 * \ \ \/\_\\ \ \L\ \ \ \ \ \
 *  \ \ \/_/_\ \ ,__/\ \ \ \ \
 *   \ \ \L\ \\ \ \/  \ \ \_\ \
 *    \ \____/ \ \_\   \ \_____\
 *     \/___/   \/_/    \/_____/
 */


const si = require('systeminformation');

/**
 * @summary Get CPU's characteristics
 * @return {Promise<Systeminformation.CpuData>}
 */

async function cpuInfo () {
	return await si.cpu();
}


/**
 * @summary Get CPU's speed characteristics
 * @return {Promise<Systeminformation.CpuCurrentSpeedData>}
 */

async function cpuSpeed () {
	const data = await si.cpuCurrentspeed();
	for (const prop in data) {
		data[prop] instanceof Array
			? data[prop].forEach((item, index) => data[prop][index]=`${item} GHz`)
			: data[prop]+=' GHz';
	}
	return data;
}


async function cpuTemp () {
	return await si.cpuTemperature();
}

module.exports = {
	cpuInfo,
	cpuSpeed,
	cpuTemp,
};