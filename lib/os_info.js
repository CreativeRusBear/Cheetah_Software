const si = require('systeminformation');

/**
 *
 */
async function generalInfo() {
  /*data about user*/
  // si.users().then(e=>console.log(e));
  const data = await si.osInfo();
  return {
    os: data.distro,
    release: data.kernel,
    arch: data.arch,
    hostname: data.hostname,
    serial: data.serial,
    build: data.build,
  };
}

module.exports={
  generalInfo,
};
