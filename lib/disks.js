const si =require('systeminformation');
const converter = require('./converter');

/**
 * @summary get summary data about disk's structure
 * @return {Promise<Systeminformation.DiskLayoutData[]>}
 */
async function physicalDiskStructure() {
  const data = await si.diskLayout();
  data.forEach((disk)=>{
    if (disk.type === 'HD') disk.type = 'Hard Disk';
    disk.size = `${converter.convertFromBToGb(disk.size, true)} Gb`;
  });
  return data;
}

/**
 * @summary Get summary data about disks, partitions, raids and roms
 * @return {Promise<Systeminformation.BlockDevicesData[]>}
 */
async function dprrInfo() {
  const data =await si.blockDevices();
  data.forEach((disk)=>{
    disk.size = (disk.size) ?
        `${converter.convertFromBToGb(parseInt(disk.size), true)} Gb` :
        '';
  });
  return data;
}

/**
 * @summary Get summary data about file system
 * @return {Promise<Systeminformation.FsSizeData[]>}
 */
async function fsInfo() {
  const data = await si.fsSize();
  data.forEach((disk)=>{
    disk.size = (disk.size) ?
        `${converter.convertFromBToGb(parseInt(disk.size), true)} Gb` :
        '';
    disk.used = (disk.used) ?
        `${converter.convertFromBToGb(parseInt(disk.used), true)} Gb` :
        '';
    disk.use = (disk.use) ?
        `${disk.use.toFixed(2)} %` :
        '';
  });
  return data;
}


module.exports={
  physicalDiskStructure,
  dprrInfo,
  fsInfo,
};
