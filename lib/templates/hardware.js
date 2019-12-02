/**
 * @description Module, that contains objects for render sections (that contains information about computer's hardware)
 * @module /lib/templates/hardware
 * @type {({img: string, description: string, id: string, title: string}|{img: string, description: string, id: string, title: string})[]}
 */
module.exports = [
	{
		id          : 'motherboard',
		img         : 'img/articles/motherboard/motherboard.svg',
		title       : 'Motherboard',
		description : 'Get system characteristics of motherboard',
	},
	{
		id          : 'bios',
		img         : 'img/articles/bios/bios.svg',
		title       : 'BIOS',
		description : 'Get info about BIOS',
	},
];