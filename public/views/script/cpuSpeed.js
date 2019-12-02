const socket = io('/cpu_speed');

/**
 * @description get new information about CPU's speed and reload old data
 */
socket.on('reload', stats => {
	const statsArr = Object.entries(stats);
	for (let index = 0, length = statsArr.length; index < length; index++) {
		if (statsArr[index][1] instanceof Array) {
			const elem = document.getElementsByClassName(statsArr[index][0]);
			for (let j = 0, classLength = elem.length; j < classLength; j++) {
				elem[j] = statsArr[index][1][j];
			}
		} else {
			const elem = document.getElementById(statsArr[index][0]);
			if (elem) elem.textContent = statsArr[index][1];
		}
	}
});