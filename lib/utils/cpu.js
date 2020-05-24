/*
 *  $$$$$$\  $$$$$$$\  $$\   $$\
 * $$  __$$\ $$  __$$\ $$ |  $$ |
 * $$ /  \__|$$ |  $$ |$$ |  $$ |
 * $$ |      $$$$$$$  |$$ |  $$ |
 * $$ |      $$  ____/ $$ |  $$ |
 * $$ |  $$\ $$ |      $$ |  $$ |
 * \$$$$$$  |$$ |      \$$$$$$  |
 *  \______/ \__|       \______/
 */

const si = require('systeminformation');



/**
 * @async
 * @function
 * @description Get CPU's characteristics
 * @return {Promise<Systeminformation.CpuData>} - detail information about cpu's architecture
 */
async function cpuInfo () {
	const wmic = require('node-wmic');
	const converter = require('./converter');

	const cpu = await si.cpu();
	const wmicCPU = await wmic.CPU();

	cpu.speed += ' GHz';
	if (cpu.speedmin) cpu.speedmin += ' GHz';
	if (cpu.speedmax) cpu.speedmax += ' GHz';
	cpu.caption = wmicCPU[0].Caption;
	cpu.arch = (function (arch) {
		switch (Number(arch)) {
		case 0 :
			return 'x86';
		case 1 :
			return 'MIPS';
		case 2 :
			return 'Alpha';
		case 3 :
			return 'PowerPC';
		case 5 :
			return 'ARM';
		case 6 :
			return 'Itanium-based systems';
		case 9 :
			return 'x64';
		}
	}(wmicCPU[0].Architecture));

	cpu.status = (function (status) {
		switch (Number(status)) {
		case 0 :
			return 'Unknown';
		case 1 :
			return 'CPU Enabled';
		case 2 :
			return 'CPU disabled by BIOS settings';
		case 3 :
			return 'CPU disabled by BIOS (POST Error)';
		case 4 :
			return 'CPU idle';
		case 5 :
		case 6 :
			return 'Reserved';
		case 7 :
			return 'Another';
		}
	}(wmicCPU[0].CpuStatus));
	cpu.extClockSpeed = `${wmicCPU[0].ExtClock} GHz`;
	cpu.name = wmicCPU[0].Name;
	for (const item in cpu.cache) {
		if (cpu.cache[item]) cpu.cache[item] = converter.convertFromKbToMb(cpu.cache[item], false, true);
	}
	return cpu;
}

/**
 * @async
 * @function
 * @description Get CPU's speed characteristics
 * @return {Promise<Systeminformation.CpuCurrentSpeedData>} - detail information about current cpu's speed
 */
async function cpuSpeed () {
	const wmic = require('node-wmic');
	const os = require('os');

	const data = await si.cpuCurrentspeed();

	const wmicCPU = await wmic.CPU();
	data.cores = os.cpus();
	for (const prop in data) {
		data[prop] instanceof Array
			? data[prop].forEach(item => item.speed = `${item.speed/1000} GHz`)
			: data[prop]+=' GHz';
	}
	data.loadPerc = `${wmicCPU[0].LoadPercentage} %`;
	return data;
}


/**
 * @function
 * @description Get CPU's temperature
 * @return {Promise<Systeminformation.CpuTemperatureData>} - detail information about current cpu's temperature
 */
function cpuTemp () {
	return si.cpuTemperature();
}

/**
 * @description Module, that provides detail information about cpu
 * @module /lib/utils/cpu
 * @type {Object}
 */
module.exports = {
	cpuInfo,
	cpuSpeed,
	cpuTemp,
};