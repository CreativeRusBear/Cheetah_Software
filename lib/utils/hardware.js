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
 * @function
 * @description Get info about motherboard
 * @return {Promise} - summary information about motherboard
 */
function motherboard () {
	return si.baseboard();
}


/**
 * @function
 * @description Get info about BIOS
 * @return {Promise} - summary information about BIOS
 */
function bios () {
	return si.bios();
}

/**
 * @description Module, that provides detail information about bios and motherboard
 * @module /lib/utils/hardware
 * @type {Object}
 */
module.exports = {
	motherboard,
	bios,
};

