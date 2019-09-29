const si =require('systeminformation');
const converter = require('./converter');
/**
 * @summary get summary data about disk's structure
 * @return {Promise<void>}
 */
async function physicalDiskStructure() {
  const data = await si.diskLayout();
  data.forEach(disk=>{
    if (disk.type === 'HD') disk.type = 'Hard Disk';
    disk.size = converter.convertFromBToGb(disk.size, true);
  });
  return data;
}


module.exports={
  physicalDiskStructure,
};
