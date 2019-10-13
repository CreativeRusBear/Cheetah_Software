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
 * @returns {Promise<Systeminformation.CpuData>}
 */

async function cpuInfo () {
	return await si.cpu();
}
module.exports = {
	cpuInfo,
};