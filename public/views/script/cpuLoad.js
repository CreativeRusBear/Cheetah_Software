import {Speedometer} from '../views/script/Speedometer.js';

window.onload = () => {
	/**
	 * @description render speedometer
	 */
	const speedometer = new Speedometer('cpuLoad', 240);
	speedometer.draw();

	/**
	 * @description set new data about CPU's load
	 */
	const socket = io('/cpu_load');
	socket.on('reload', stats => {
		if (speedometer) {
			speedometer.val(stats.currentload);
		}
		stats.cpus.forEach((core, index) => {
			const coreDOM = document.querySelector('.cpus').children[index];
			const load =core.load.toFixed();
			Array.from(coreDOM.children).shift().textContent = load.length === 1 ? `0${load} %` : `${load} %`;
		});
	});
};
