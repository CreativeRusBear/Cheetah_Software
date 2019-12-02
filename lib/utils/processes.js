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
 * @async
 * @function
 * @description Get stats about current CPU load
 * @return {Promise<Systeminformation.CurrentLoadData>} - detail information about current CPU-Load
 */
async function cpuLoad () {
	return await si.currentLoad();
}


/**
 * @async
 * @function
 * @description Get info about running processes on your PC
 * @return {Promise<Systeminformation.ProcessesData>} - list of running processes
 */
async function runningProcesses () {
	return await si.processes();
}

/**
 * @description Module, that provides detail information about cpu's current load and running processes on your PC
 * @module /lib/utils/processes
 * @type {{cpuLoad: (function(): Systeminformation.CurrentLoadData), runningProcesses: (function(): Systeminformation.ProcessesData)}}
 */
module.exports = {
	cpuLoad,
	runningProcesses,
};