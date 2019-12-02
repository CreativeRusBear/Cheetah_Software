/*
 *    $$\   $$\                           $$\
 *    $$ |  $$ |                          $$ |
 *    $$ |  $$ | $$$$$$\   $$$$$$\   $$$$$$$ |$$\  $$\  $$\  $$$$$$\   $$$$$$\   $$$$$$\
 *    $$$$$$$$ | \____$$\ $$  __$$\ $$  __$$ |$$ | $$ | $$ | \____$$\ $$  __$$\ $$  __$$\
 *    $$  __$$ | $$$$$$$ |$$ |  \__|$$ /  $$ |$$ | $$ | $$ | $$$$$$$ |$$ |  \__|$$$$$$$$ |
 *    $$ |  $$ |$$  __$$ |$$ |      $$ |  $$ |$$ | $$ | $$ |$$  __$$ |$$ |      $$   ____|
 *    $$ |  $$ |\$$$$$$$ |$$ |      \$$$$$$$ |\$$$$$\$$$$  |\$$$$$$$ |$$ |      \$$$$$$$\
 *    \__|  \__| \_______|\__|       \_______| \_____\____/  \_______|\__|       \_______|
 */

const si = require('systeminformation');


/**
 * @async
 * @function
 * @description Get info about motherboard
 * @return {Promise<any>} - summary information about motherboard (baseboard)
 */
async function motherboard () {
	return await si.baseboard();
}


/**
 * @async
 * @function
 * @description Get info about BIOS
 * @return {Promise<any>} - summary inforamtion about BIOS
 */
async function bios () {
	return await si.bios();
}

/**
 * @description Module, that provides detail information about bios and motherboard
 * @module /lib/utils/hardware
 * @type {{bios: (function(): Systeminformation.BiosData), motherboard: (function(): Systeminformation.BaseboardData)}}
 */
module.exports = {
	motherboard,
	bios,
};

