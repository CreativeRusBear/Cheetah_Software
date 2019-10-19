/*
 *  $$$$$$\   $$$$$$\
 * $$  __$$\ $$  __$$\
 * $$ /  $$ |$$ /  \__|
 * $$ |  $$ |\$$$$$$\
 * $$ |  $$ | \____$$\
 * $$ |  $$ |$$\   $$ |
 *  $$$$$$  |\$$$$$$  |
 *  \______/  \______/
 */


const si = require('systeminformation');

/**
 * @summary general data about OS
 */
async function generalInfo () {
	const data = await si.osInfo();
	return {
		os       : data.distro.match(/\w+/g).join(' '),
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
