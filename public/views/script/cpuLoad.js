import {Speedometer} from '../views/script/Speedometer.js';

window.onload = () => {
	const speedometer = new Speedometer('cpuLoad', 240);
	speedometer.draw();

	const socket = io('/cpu_load');
	socket.on('reload', stats => {
		if (speedometer) {
			speedometer.val(stats.currentload);
		}
	});
};
