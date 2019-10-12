/**
 *  _____    ____
 * /\  __`\ /\  _`\
 * \ \ \/\ \\ \,\L\_\
 *  \ \ \ \ \\/_\__ \
 *   \ \ \_\ \ /\ \L\ \
 *    \ \_____\\ `\____\
 *     \/_____/ \/_____/
 */


const si = require('systeminformation');

/**
 * @summary general data about OS
 */
async function generalInfo () {
	/* Data about user*/
	// Si.users().then(e=>console.log(e));
	const data = await si.osInfo();
	return {
		os       : data.distro,
		release  : data.kernel,
		arch     : data.arch,
		hostname : data.hostname,
		serial   : data.serial,
		build    : data.build,
	};
}

module.exports = {
	generalInfo,
};
