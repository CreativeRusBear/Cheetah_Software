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
 * @summary get stats about memory
 * @return {Promise<Systeminformation.MemData>}
 */

async function memStats () {
	const data = converter.convertFromBToGb(await si.mem(), true, true);
	return data;
}


/**
 * @summary get detail information about memory
 * @return {Promise<Systeminformation.MemLayoutData>}
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

module.exports = {
	memStats,
	memInfo,
};
