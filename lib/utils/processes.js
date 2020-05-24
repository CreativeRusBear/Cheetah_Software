/*
 * $$$$$$$\
 * $$  __$$\
 * $$ |  $$ | $$$$$$\   $$$$$$\   $$$$$$$\  $$$$$$\   $$$$$$$\  $$$$$$$\  $$$$$$\   $$$$$$$\
 * $$$$$$$  |$$  __$$\ $$  __$$\ $$  _____|$$  __$$\ $$  _____|$$  _____|$$  __$$\ $$  _____|
 * $$  ____/ $$ |  \__|$$ /  $$ |$$ /      $$$$$$$$ |\$$$$$$\  \$$$$$$\  $$$$$$$$ |\$$$$$$\
 * $$ |      $$ |      $$ |  $$ |$$ |      $$   ____| \____$$\  \____$$\ $$   ____| \____$$\
 * $$ |      $$ |      \$$$$$$  |\$$$$$$$\ \$$$$$$$\ $$$$$$$  |$$$$$$$  |\$$$$$$$\ $$$$$$$  |
 * \__|      \__|       \______/  \_______| \_______|\_______/ \_______/  \_______|\_______/
 */


const si = require('systeminformation');


/**
 * @function
 * @description Get stats about current CPU load
 * @return {Promise<Systeminformation.CurrentLoadData>} - detail information about current CPU-Load
 */
function cpuLoad () {
	return si.currentLoad();
}


/**
 * @function
 * @description Get info about running processes on your PC
 * @return {Promise<Systeminformation.ProcessesData>} - list of running processes
 */
function runningProcesses () {
	return si.processes();
}

/**
 * @description Module, that provides detail information about cpu's current load and running processes on your PC
 * @module /lib/utils/processes
 * @type {Object}
 */
module.exports = {
	cpuLoad,
	runningProcesses,
};