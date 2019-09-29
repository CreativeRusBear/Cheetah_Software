const si =require('systeminformation');

/**
 * @summary get summary data about disk's structure
 * @return {Promise<void>}
 */
async function physicalDiskStructure() {
  const data = await si.diskLayout();
  return data;
}

module.exports={
  physicalDiskStructure,
};
