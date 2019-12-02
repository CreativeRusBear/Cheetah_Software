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
 * @async
 * @function
 * @description general data about OS
 * @return {Object} - detail information about OS
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

/**
 * @description Module, that provides detail information about installed OS on your PC
 * @module /lib/utils/os
 * @type {{generalInfo: (function(): {hostname: string, os: string, serial: string, build: string, release: string, arch: string})}}
 */
module.exports = {
	generalInfo,
};
