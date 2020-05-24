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
	return data.map(disk => {
		if (disk.type === 'HD') disk.type = 'Hard Disk';
		disk.size = converter.convertFromBToGb(disk.size, true, true);
		return disk;
	});
}


/**
 * @async
 * @function
 * @description Get summary data about disks, partitions, raids and roms
 * @return {Promise<Systeminformation.BlockDevicesData[]>} - summary information about data about disks, partitions, raids and roms
 */
async function dprrInfo () {
	const data = await si.blockDevices();
	return data.map(disk => {
		disk.size = disk.size ?
			converter.convertFromBToGb(parseInt(disk.size), true, true) :
			'';
		return disk;
	});
}


/**
 * @async
 * @function
 * @description Get summary data about file system
 * @return {Promise<Systeminformation.FsSizeData[]>} - summary information about file system
 */
async function fsInfo () {
	const data = await si.fsSize();
	return data.map(disk => {
		disk.size = disk.size ?
			converter.convertFromBToGb(parseInt(disk.size), true, true) :
			'';
		disk.used = disk.used ?
			converter.convertFromBToGb(parseInt(disk.used), true, true) :
			'';
		disk.use = disk.use ?
			`${disk.use.toFixed(2)} %` :
			'';
		return disk;
	});
}

/**
 * @description Module, that provides detail information about disks and file system
 * @module /lib/utils/disks
 * @type {Object}
 */
module.exports={
	physicalDiskStructure,
	dprrInfo,
	fsInfo,
};
