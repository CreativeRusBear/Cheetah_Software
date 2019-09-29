/**
 * @summary Convert from bytes to megabytes
 * @type {number}
 */
function convertFromBToMb(props, fixed) {
  for (const prop in props) {
    props[prop] = (fixed) ?
        (props[prop]/(1024**2)).toFixed(2) :
        (props[prop]/(1024**2));
  }
  return props;
}

module.exports={
  convertFromBToMb,
};
