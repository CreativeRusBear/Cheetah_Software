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
  return data[0];
}

/**
 *
 * @returns {Promise<Systeminformation.NetworkConnectionsData>}
 */
async function connection(){
  const data = await si.networkConnections();
  return data;
}
module.exports={
  netInterface,
  getStats,
  connection
};
