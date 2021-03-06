/**
 * @description Module, that contains objects for render sections (that contains information about cpu load and running processes)
 * @module /lib/templates/processes
 * @type {Array.<Object>}
 */
module.exports = [
	{
		id    : 'cpu_load',
		img   : 'img/articles/cpu/cpu.svg',
		title : 'CPU current load',
	},
	{
		id    : 'running_processes',
		img   : 'img/articles/graphs/stats_window.svg',
		title : 'Running processes',
	},
];
