const socket = io('/mem_stats');

/**
 * @description set new statistic about RAM's state
 */
socket.on('reload', stats => {
	const statsArr = Object.entries(stats);
	for (let index = 0, length = statsArr.length; index < length; index++) {
		const elem = document.getElementById(statsArr[index][0]);
		if (elem) elem.textContent = statsArr[index][1];
	}
});