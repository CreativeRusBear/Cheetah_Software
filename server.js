/**
 *  ____     __                        __              __
 * /\  _`\  /\ \                      /\ \__          /\ \
 * \ \ \/\_\\ \ \___       __      __ \ \ ,_\     __  \ \ \___
 *  \ \ \/_/_\ \  _ `\   /'__`\  /'__`\\ \ \/   /'__`\ \ \  _ `\
 *   \ \ \L\ \\ \ \ \ \ /\  __/ /\  __/ \ \ \_ /\ \L\.\_\ \ \ \ \
 *    \ \____/ \ \_\ \_\\ \____\\ \____\ \ \__\\ \__/.\_\\ \_\ \_\
 *     \/___/   \/_/\/_/ \/____/ \/____/  \/__/ \/__/\/_/ \/_/\/_/
 *
 *
 *  ____                 ___  __
 * /\  _`\             /'___\/\ \__
 * \ \,\L\_\     ___  /\ \__/\ \ ,_\  __  __  __     __     _ __    __
 *  \/_\__ \    / __`\\ \ ,__\\ \ \/ /\ \/\ \/\ \  /'__`\  /\`'__\/'__`\
 *    /\ \L\ \ /\ \L\ \\ \ \_/ \ \ \_\ \ \_/ \_/ \/\ \L\.\_\ \ \//\  __/
 *    \ `\____\\ \____/ \ \_\   \ \__\\ \___x___/'\ \__/.\_\\ \_\\ \____\
 *     \/_____/ \/___/   \/_/    \/__/ \/__//__/   \/__/\/_/ \/_/ \/____/
 */






const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const process = require('process');
const path = require('path');

/**
 * @summary Pug settings
 */
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/public/views'));

app.use(express.static(`${__dirname}/public`));

/**
 * @summary data for main page
 */
app.get('/', (req, res) => {
	const template = require('./lib/templates/template');
	res.render('index', {
		title  : 'Cheetah Software',
		slogan : 'Get more data about your PC',
		blocks : template,
	});
});

/**
 * @summary load data about your os
 */
app.get('/os', async (req, res) => {
	try {
		const osInfo = require('./lib/utils/os_info');
		const data = await osInfo.generalInfo();
		res.render('os', {
			title  : 'OS',
			slogan : 'Get data about your operating system',
			data,
		});
	} catch (e) {
		console.error(e);
	}
});

/**
 * @summary load data about network
 */
app.get('/network', async (req, res) => {
	try {
		const netInfo = require('./lib/utils/net');
		const net = io.of('/network');

		res.render('network', {
			title  : 'Network',
			slogan : 'Get data about ip address, mask and etc.',
			data   : {...await netInfo.netInterface(), ...await netInfo.getStats()},
		});
		setInterval(async () =>
			net.emit('network_stats', await netInfo.getStats()), 2500);
	} catch (e) {
		console.error(e);
	}
});

/**
 * @summary load disks section
 */
app.get('/disks', async (req, res) => {
	try {
		const template = require('./lib/templates/disk_template');
		res.render('disks', {
			title  : 'Disks',
			slogan : 'Get all data disk structure and etc.',
			blocks : template,
		});
	} catch (e) {
		console.error(e);
	}
});

/**
 * @summary load data about physical disk layout
 */
app.get('/disks/disk_layout', async (req, res) => {
	try {
		const disksInfo = require('./lib/utils/disks');
		res.render('disk_layout', {
			title  : 'Disks Layout',
			slogan : 'Get data about physical disk layout',
			data   : await disksInfo.physicalDiskStructure(),
		});
	} catch (e) {
		console.error(e);
	}
});

/**
 * @summary load data about disks, partitions, raids and roms
 */
app.get('/disks/block_devices', async (req, res) => {
	try {
		const disksInfo = require('./lib/utils/disks');
		res.render('block_devices', {
			title  : 'Disks, partitions, raids and roms',
			slogan : 'Get data about disks, partitions, raids and roms',
			data   : await disksInfo.dprrInfo(),
		});
	} catch (e) {
		console.error(e);
	}
});

/**
 * @summary load data about current file system
 */
app.get('/disks/transfer', async (req, res) => {
	try {
		const disksInfo = require('./lib/utils/disks');
		const fsData = io.of('/transfer');
		res.render('transfer', {
			title  : 'Current transfer stats',
			slogan : 'Get current transfer stats of your disks',
			data   : await disksInfo.fsInfo(),
		});
		setInterval(async () =>
			fsData.emit('fs_data', await disksInfo.fsInfo()), 2500);
	} catch (e) {
		console.error(e);
	}
});


app.get('/processor_info', (req, res) => {
	const {NUMBER_OF_PROCESSORS, PROCESSOR_ARCHITECTURE, PROCESSOR_IDENTIFIER} = process.env;
});

/**
 * @summary render section about computer's memory
 */
app.get('/memory', (req, res) => {
	try {
		const template = require('./lib/templates/memory_template');
		res.render('memory', {
			title  : 'Memory',
			slogan : 'Get data about PC\'s memories',
			blocks : template,
		});
	} catch (e) {
		console.error(e);
	}
});

http.listen(8000, () => {
	console.log('Listen on http://127.0.0.1:8000');
});

