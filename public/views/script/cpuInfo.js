const socket = io('/cpu_info');
socket.on('reload', stats => {
	const statsArr = Object.entries(stats);
	for(let index = 0, length = statsArr.length; index < length; index++) {
		if (statsArr[index][1] instanceof Object) {
			for (const item in statsArr[index][1]) {
				findElemById(item, statsArr[index][1][item]);
			}
		} else {
			findElemById(statsArr[index][0], statsArr[index][1]);
		}
	}
});

function findElemById(propName, result) {
	const elem = document.getElementById(propName);
	if (elem) elem.textContent = result;
}