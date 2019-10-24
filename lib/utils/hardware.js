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
 * @summary Get info about motherboard
 * @return {Promise<any>}
 */

async function motherboard () {
	return await si.baseboard();
}


/**
 * @summary Get info about BIOS
 * @return {Promise<any>}
 */

async function bios () {
	return await si.bios();
}

module.exports = {
	motherboard,
	bios,
};

