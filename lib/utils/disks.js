/*
 * $$$$$$$\  $$\           $$\
 * $$  __$$\ \__|          $$ |
 * $$ |  $$ |$$\  $$$$$$$\ $$ |  $$\  $$$$$$$\
 * $$ |  $$ |$$ |$$  _____|$$ | $$  |$$  _____|
 * $$ |  $$ |$$ |\$$$$$$\  $$$$$$  / \$$$$$$\
 * $$ |  $$ |$$ | \____$$\ $$  _$$<   \____$$\
 * $$$$$$$  |$$ |$$$$$$$  |$$ | \$$\ $$$$$$$  |
 * \_______/ \__|\_______/ \__|  \__|\_______/
 */


const si =require('systeminformation');
const converter = require('./converter');


/**
 * @async
 * @function
 * @description get summary data about disk's structure
 * @return {Promise<Systeminformation.DiskLayoutData[]>} - detail information about disk's structure
 */
async function physicalDiskStructure () {
	const data = await si.diskLayout();
	data.forEach(disk => {
		if (disk.type === 'HD') disk.type = 'Hard Disk';
		disk.size = converter.convertFromBToGb(disk.size, true, true);
	});
	return data;
}


/**
 * @async
 * @function
 * @description Get summary data about disks, partitions, raids and roms
 * @return {Promise<Systeminformation.BlockDevicesData[]>} - summary information about data about disks, partitions, raids and roms
 */
async function dprrInfo () {
	const data =await si.blockDevices();
	data.forEach(disk => {
		disk.size = disk.size ?
			converter.convertFromBToGb(parseInt(disk.size), true, true) :
			'';
	});
	return data;
}


/**
 * @async
 * @function
 * @description Get summary data about file system
 * @return {Promise<Systeminformation.FsSizeData[]>} - summary information about file system
 */
async function fsInfo () {
	const data = await si.fsSize();
	data.forEach(disk => {
		disk.size = disk.size ?
			converter.convertFromBToGb(parseInt(disk.size), true, true) :
			'';
		disk.used = disk.used ?
			converter.convertFromBToGb(parseInt(disk.used), true, true) :
			'';
		disk.use = disk.use ?
			`${disk.use.toFixed(2)} %` :
			'';
	});
	return data;
}

/**
 * @description Module, that provides detail information about disks and file system
 * @module /lib/utils/disks
 * @type {{physicalDiskStructure: (function(): Systeminformation.DiskLayoutData[]), dprrInfo: (function(): Systeminformation.BlockDevicesData[]), fsInfo: (function(): Systeminformation.FsSizeData[])}}
 */
module.exports={
	physicalDiskStructure,
	dprrInfo,
	fsInfo,
};
