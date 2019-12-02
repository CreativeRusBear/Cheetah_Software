/**
 * @description Module, that contains objects for render main sections (that contains information about your PC)
 * @module /lib/templates/main
 * @type {({img: string, description: string, id: string, title: string}|{img: string, description: string, id: string, title: string}|{img: string, description: string, id: string, title: string}|{img: string, description: string, id: string, title: string}|{img: string, description: string, id: string, title: string})[]}
 */
module.exports = [
	{
		id          : 'hardware',
		img         : 'img/articles/computer/sys-block.svg',
		title       : 'System (Hardware)',
		description : 'Get system hardware data',
	},
	{
		id          : 'os',
		img         : 'img/articles/os/undraw_operating_system_4lr6.svg',
		title       : 'OS',
		description : 'Get data about your operating system',
	},
	{
		id          : 'network',
		img         : 'img/articles/net/undraw_connected_world_wuay.svg',
		title       : 'Network',
		description : 'Get data about ip address, mask and etc.',
	},
	{
		id          : 'disks',
		img         : 'img/articles/disks/files_and_folder.svg',
		title       : 'Disks',
		description : 'Get data about disks',
	},
	{
		id          : 'ram',
		img         : 'img/articles/memory/undraw_software_engineer_lvl5.svg',
		title       : 'RAM',
		description : 'Get data about PC\'s memories',
	},
	{
		id          : 'cpu',
		img         : 'img/articles/cpu/undraw_in_progress_ql66.svg',
		title       : 'CPU',
		description : 'Get data about your processor',
	},
	{
		id          : 'graphics',
		img         : 'img/articles/gpu/undraw_3d_modeling_h60h.svg',
		title       : 'Graphics',
		description : 'Get data about your graphics card and display',
	},
	{
		id          : 'graphs',
		img         : 'img/articles/graphs/undraw_growth_analytics_8btt.svg',
		title       : 'Graphs',
		description : 'See PC\'s peripheral indicators',
	},
];
