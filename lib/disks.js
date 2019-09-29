const si =require('systeminformation');

/**
 * @summary get summary data about disk's structure
 * @return {Promise<void>}
 */
async function physicalDiskStructure() {
  const data = await si.diskLayout();
  data.forEach(disk=>{
    for (let prop in disk){
     if (prop === 'type' && disk[prop] === 'HD') disk [prop] = 'Hard Disk';
    }
  });
  return data;
}

module.exports={
  physicalDiskStructure,
};
