/*
 * $$\   $$\            $$\                                       $$\
 * $$$\  $$ |           $$ |                                      $$ |
 * $$$$\ $$ | $$$$$$\ $$$$$$\   $$\  $$\  $$\  $$$$$$\   $$$$$$\  $$ |  $$\
 * $$ $$\$$ |$$  __$$\\_$$  _|  $$ | $$ | $$ |$$  __$$\ $$  __$$\ $$ | $$  |
 * $$ \$$$$ |$$$$$$$$ | $$ |    $$ | $$ | $$ |$$ /  $$ |$$ |  \__|$$$$$$  /
 * $$ |\$$$ |$$   ____| $$ |$$\ $$ | $$ | $$ |$$ |  $$ |$$ |      $$  _$$<
 * $$ | \$$ |\$$$$$$$\  \$$$$  |\$$$$$\$$$$  |\$$$$$$  |$$ |      $$ | \$$\
 * \__|  \__| \_______|  \____/  \_____\____/  \______/ \__|      \__|  \__|
 */


const si =require('systeminformation');
const converter = require('./converter');


/**
 * @async
 * @function
 * @description Get basic data about your net interface
 * @return {Object} - detail information about Ethernet interface
 */
async function netInterface () {
	const netData = await si.networkInterfaces();
	const os = require('os');
	const ethernet = netData.find(item => item.iface === 'Ethernet');
	const ipv6_mask = os.networkInterfaces().Ethernet.shift().netmask;
	const ipv4_mask = os.networkInterfaces().Ethernet.pop().netmask;
	return {
		iface     : ethernet.iface,
		ifaceName : ethernet.ifaceName,
		ipv4      : ethernet.ip4,
		ipv4_mask : ipv4_mask,
		ipv6_mask : ipv6_mask,
		ipv6      : ethernet.ip6,
		mac       : ethernet.mac,
		operstate : ethernet.operstate,
		type      : ethernet.type,
	};
}

/**
 * @async
 * @function
 * @description Get network statistic
 * @return {Object} - current network stats of Ethernet
 */
async function getStats () {
	const data = await si.networkStats();
	let firstElem = data.shift();
	const dataForConvert = {
		rx_bytes : firstElem.rx_bytes,
		tx_bytes : firstElem.tx_bytes,
		rx_sec   : firstElem.rx_sec,
		tx_sec   : firstElem.tx_sec,
	};
	const convertingData = converter.convertFromBToMb(dataForConvert, true, true);
	firstElem = {...firstElem, ...convertingData};
	return firstElem;
}


/**
 * @async
 * @function
 * @description Get data about your network connection
 * @return {Promise<Systeminformation.NetworkConnectionsData[]>} - detail information about network connection
 */
async function connection () {
	return await si.networkConnections();
}

/**
 * @description
 * @module /lib/utils/net
 * @type {{getStats: (function(): {[p: string]: *}), netInterface: (function(): {iface: string, ipv6_mask: string, ipv4: string, ipv6: string, ifaceName: string, ipv4_mask: string, operstate: string, type: string, mac: string}), connection: (function(): Systeminformation.NetworkConnectionsData[])}}
 */
module.exports={
	netInterface,
	getStats,
	connection,
};
