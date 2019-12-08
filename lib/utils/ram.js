/*
 * $$\      $$\
 * $$$\    $$$ |
 * $$$$\  $$$$ | $$$$$$\  $$$$$$\$$$$\   $$$$$$\   $$$$$$\  $$\   $$\
 * $$\$$\$$ $$ |$$  __$$\ $$  _$$  _$$\ $$  __$$\ $$  __$$\ $$ |  $$ |
 * $$ \$$$  $$ |$$$$$$$$ |$$ / $$ / $$ |$$ /  $$ |$$ |  \__|$$ |  $$ |
 * $$ |\$  /$$ |$$   ____|$$ | $$ | $$ |$$ |  $$ |$$ |      $$ |  $$ |
 * $$ | \_/ $$ |\$$$$$$$\ $$ | $$ | $$ |\$$$$$$  |$$ |      \$$$$$$$ |
 * \__|     \__| \_______|\__| \__| \__| \______/ \__|       \____$$ |
 * 															$$\   $$ |
 *                                                          \$$$$$$  |
 *                                                           \______/
 */


const si = require('systeminformation');
const converter = require('./converter');


/**
 * @async
 * @function
 * @description get stats about memory
 * @return {Promise<Systeminformation.MemData>} - Memory stats
 */
async function memStats () {
	const data = converter.convertFromBToGb(await si.mem(), true, true);
	return data;
}


/**
 * @async
 * @function
 * @description get detail information about memory
 * @return {Promise<Systeminformation.MemLayoutData>} - detail information about ram
 */
async function memInfo () {
	const wmic = require('node-wmic');
	const data = await si.memLayout();
	data.forEach(mem => {
		mem.size = mem.size
			? converter.convertFromBToGb(parseInt(mem.size), true, true)
			: '';
	});
	const memoryChips = await wmic.MemoryChip();
	memoryChips.forEach( (chip, index) => {
		data[index].speed = chip.Speed;
		data[index].tag = chip.Tag;
	});
	return data;
}

/**
 * @description Module, that provides detail information about RAM
 * @module /lib/utils/ram
 * @type {Object}
 */
module.exports = {
	memStats,
	memInfo,
};
