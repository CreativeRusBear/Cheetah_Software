const socket = io('/cpu_info');

/**
 * @description get new information about CPU and reload old data
 */
socket.on('reload', stats => {
	const statsArr = Object.entries(stats);
	for (let index = 0, length = statsArr.length; index < length; index++) {
		if (statsArr[index][1] instanceof Object) {
			for (const item in statsArr[index][1]) {
				findElemById(item, statsArr[index][1][item]);
			}
		} else {
			findElemById(statsArr[index][0], statsArr[index][1]);
		}
	}
});

/**
 * @function
 * @description Find DOM element and set new data
 * @param {String} propName - name of property
 * @param result - new data
 * @private
 */
function findElemById (propName, result) {
	const elem = document.getElementById(propName);
	if (elem) elem.textContent = result;
}