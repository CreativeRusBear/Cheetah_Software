/**
 * @summary Convert from bytes to megabytes
 * @type {number}
 */
function convertFromBToMb(data, fixed) {
  if (data.constructor === Object) {
    for (let prop in data) {
      data[prop] = (fixed) ?
          (data[prop]/(1024**2)).toFixed(2) :
          (data[prop]/(1024**2));
    }
  }
  if (data.constructor === Number) {
    data = (fixed) ? (data/(1024**2)).toFixed(2) : (data/(1024**2));
  }
  return data;
}


/**
 * @summary Convert from bytes to gigabytes
 * @type {number}
 */
function convertFromBToGb(data, fixed) {
  if (data.constructor === Object) {
    for (let prop in data) {
      data[prop] = (fixed) ?
          (data[prop]/(1024**3)).toFixed(2) :
          (data[prop]/(1024**3));
    }
  }
  if (data.constructor === Number) {
    data = (fixed) ? (data/(1024**3)).toFixed(2) : (data/(1024**3));
  }
  return data;
}

module.exports={
  convertFromBToMb,
  convertFromBToGb
};
