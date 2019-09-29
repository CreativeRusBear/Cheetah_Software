const si =require('systeminformation');

/**
 * @summary Get basic data about your net interface
 * @returns {Promise<{iface: *, ipv4: *, ipv6: *, ifaceName: *, operstate: *, type: *, mac: *}>}
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
 * @returns {Promise<void>}
 */
async function getStats(){
  const data = await si.networkStats();
  /**
   * @summary Convert from bytes to megabytes
   * @type {number}
   */
  data[0].rx_bytes = (data[0].rx_bytes/(1024**2)).toFixed(2);
  data[0].tx_bytes = (data[0].tx_bytes/(1024**2)).toFixed(2);
  data[0].rx_sec = (data[0].rx_sec/(1024**2)).toFixed(2);
  data[0].tx_sec = (data[0].rx_sec/(1024**2)).toFixed(2);
  return data[0];
}

/**
 * @summary Get data about your network connection
 * @returns {Promise<Systeminformation.NetworkConnectionsData[]>}
 */
async function connection(){
  return await si.networkConnections();
}
module.exports={
  netInterface,
  getStats,
  connection
};
