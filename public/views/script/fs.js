const socket = io('/fs_stats');
socket.on('fs_data', disks => {
	for (let index = 0, length = disks.length; index < length; index++) {
		for (let prop in disks[index]) {
			const elem = document.getElementsByClassName(prop)[index];
			if (elem) elem.textContent = disks[index][prop];
		}
	}
});