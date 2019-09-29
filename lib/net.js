const si =require('systeminformation');
const converter = require('./converter');
/**
 * @summary Get basic data about your net interface
 * @return {Promise<{iface: *, ipv4: *, ipv6: *, ifaceName: *, operstate: *, type: *, mac: *}>}
 */
async function netInterface() {
  const netData = await si.networkInterfaces();
  const ethernet = netData[0];
  return {
    iface: ethernet.iface,
    ifaceName: ethernet.ifaceName,
    ipv4: ethernet.ip4,
    ipv6: ethernet.ip6,
    mac: ethernet.mac,
    operstate: ethernet.operstate,
    type: ethernet.type,
  };
}

/**
 * @summary Get statistic
 * @return {Promise<void>}
 */
async function getStats() {
  const data = await si.networkStats();
  let firstElem = data.shift();
  const dataForConvert = {
    rx_bytes: firstElem.rx_bytes,
    tx_bytes: firstElem.tx_bytes,
    rx_sec: firstElem.rx_sec,
    tx_sec: firstElem.tx_sec,
  };
  const convertingData = converter.convertFromBToMb(dataForConvert, true);
  firstElem = {...firstElem, ...convertingData};
  return firstElem;
}

/**
 * @summary Get data about your network connection
 * @return {Promise<Systeminformation.NetworkConnectionsData[]>}
 */
async function connection() {
  return await si.networkConnections();
}
module.exports={
  netInterface,
  getStats,
  connection,
};
