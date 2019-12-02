/**
 * @description Module, that contains objects for render sections (that contains information about disk)
 * @module /lib/templates/disk
 * @type {({img: string, id: string, title: string}|{img: string, id: string, title: string}|{img: string, id: string, title: string})[]}
 */
module.exports = [
	{
		id    : 'disk_layout',
		img   : 'img/articles/graphs/analyze_data.svg',
		title : 'Memory information',
	},
	{
		id    : 'block_devices',
		img   : 'img/articles/disks/data_maintenance.svg',
		title : 'Get data about disks, partitions, raids and roms',
	},
	{
		id    : 'fs_stats',
		img   : 'img/articles/graphs/analyze_on_screen.svg',
		title : 'Current stats about file systems',
	},
];
