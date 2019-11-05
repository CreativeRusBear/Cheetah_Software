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
 * @summary Get stats about current CPU load
 * @returns {Promise<Systeminformation.CurrentLoadData>}
 */

async function cpuLoad () {
	return await si.currentLoad();
}


/**
 * @summary Get info about running processes on your PC
 * @returns {Promise<Systeminformation.ProcessesData>}
 */

async function runningProcesses () {
	return await si.processes();
}

module.exports = {
	cpuLoad,
	runningProcesses,
};