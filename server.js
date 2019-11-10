/*
 *  $$$$$$\  $$\                            $$\               $$\
 * $$  __$$\ $$ |                           $$ |              $$ |
 * $$ /  \__|$$$$$$$\   $$$$$$\   $$$$$$\ $$$$$$\    $$$$$$\  $$$$$$$\
 * $$ |      $$  __$$\ $$  __$$\ $$  __$$\\_$$  _|   \____$$\ $$  __$$\
 * $$ |      $$ |  $$ |$$$$$$$$ |$$$$$$$$ | $$ |     $$$$$$$ |$$ |  $$ |
 * $$ |  $$\ $$ |  $$ |$$   ____|$$   ____| $$ |$$\ $$  __$$ |$$ |  $$ |
 * \$$$$$$  |$$ |  $$ |\$$$$$$$\ \$$$$$$$\  \$$$$  |\$$$$$$$ |$$ |  $$ |
 *  \______/ \__|  \__| \_______| \_______|  \____/  \_______|\__|  \__|
 *
 *
 *
 *  $$$$$$\             $$$$$$\    $$\
 * $$  __$$\           $$  __$$\   $$ |
 * $$ /  \__| $$$$$$\  $$ /  \__|$$$$$$\   $$\  $$\  $$\  $$$$$$\   $$$$$$\   $$$$$$\
 * \$$$$$$\  $$  __$$\ $$$$\     \_$$  _|  $$ | $$ | $$ | \____$$\ $$  __$$\ $$  __$$\
 *  \____$$\ $$ /  $$ |$$  _|      $$ |    $$ | $$ | $$ | $$$$$$$ |$$ |  \__|$$$$$$$$ |
 * $$\   $$ |$$ |  $$ |$$ |        $$ |$$\ $$ | $$ | $$ |$$  __$$ |$$ |      $$   ____|
 * \$$$$$$  |\$$$$$$  |$$ |        \$$$$  |\$$$$$\$$$$  |\$$$$$$$ |$$ |      \$$$$$$$\
 *  \______/  \______/ \__|         \____/  \_____\____/  \_______|\__|       \_______|
 */



const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const process = require('process');
const path = require('path');
const chalk = require('chalk');


/**
 * @summary Pug settings
 */

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/public/views'));

app.use(express.static(`${__dirname}/public`));


/**
 * @summary load section for main page
 */

app.get('/', (req, res) => {
	try {
		const template = require('./lib/templates/main');
		res.render('index', {
			title  : 'Cheetah Software',
			slogan : 'Get more data about your PC',
			blocks : template,
		});
	} catch (e) {
		console.error(e);
	}
});



/**
 * @summary Load section about hardware
 */

app.get('/hardware', async (req, res) => {
	try {
		const template = require('./lib/templates/hardware');
		res.render('hardware', {
			title  : 'Hardware',
			slogan : 'Get data about hardware',
			blocks : template,
		});
	} catch (e) {
		console.error(e);
	}
});


/**
 * @summary Load data about motherboard's characteristics
 */

app.get('/hardware/motherboard', async (req, res) => {
	try {
		const hardware = require('./lib/utils/hardware');
		res.render('motherboard', {
			title  : 'Motherboard',
			slogan : 'Get system characteristics of motherboard',
			data   : await hardware.motherboard(),
		});
	} catch (e) {
		console.error(e);
	}
});


/**
 * @summary Load data about motherboard's characteristics
 */

app.get('/hardware/bios', async (req, res) => {
	try {
		const hardware = require('./lib/utils/hardware');
		res.render('bios', {
			title  : 'BIOS',
			slogan : 'Get info about BIOS',
			data   : await hardware.bios(),
		});
	} catch (e) {
		console.error(e);
	}
});


/**
 * @summary load data about your os
 */

app.get('/os', async (req, res) => {
	try {
		const osInfo = require('./lib/utils/os');
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
 * @summary load articles about network
 */

app.get('/network', (req, res) => {
	try {
		const template = require('./lib/templates/net');
		res.render('network', {
			title  : 'Network',
			slogan : 'Get data about ip address, mask and etc.',
			blocks : template,
		});
	} catch (e) {
		console.error(e);
	}
});


/**
 * @summary load data about net interface
 */

app.get('/network/net_interface', async (req, res) => {
	try {
		const netInfo = require('./lib/utils/net');
		res.render('net_interface', {
			title  : 'Network Interface',
			slogan : 'Get data about network interface',
			data   : await netInfo.netInterface(),
		});
	} catch (e) {
		console.error(e);
	}
});


/**
 * @summary load network's stats
 */

app.get('/network/net_stats', async (req, res) => {
	try {
		const netInfo = require('./lib/utils/net');
		const net = io.of('/network_stats');

		res.render('net_stats', {
			title  : 'Network Stats',
			slogan : 'Get data about current network stats',
			data   : await netInfo.getStats(),
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

app.get('/disks', (req, res) => {
	try {
		const template = require('./lib/templates/disk');
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
 * @summary load data about current file systems
 */

app.get('/disks/fs_stats', async (req, res) => {
	try {
		const disksInfo = require('./lib/utils/disks');
		const fsData = io.of('/fs_stats');
		res.render('fs_stats', {
			title  : 'Current stats about file systems',
			slogan : 'Get current transfer stats of your disks',
			data   : await disksInfo.fsInfo(),
		});
		setInterval(async () =>
			fsData.emit('fs_data', await disksInfo.fsInfo()), 2500);
	} catch (e) {
		console.error(e);
	}
});


/**
 * @summary render section about computer's memory
 */

app.get('/ram', (req, res) => {
	try {
		const template = require('./lib/templates/ram');
		res.render('ram', {
			title  : 'RAM',
			slogan : 'Get data about PC\'s memories',
			blocks : template,
		});
	} catch (e) {
		console.error(e);
	}
});


/**
 * @summary get data about memory
 */

app.get('/ram/mem_info', async (req, res) => {
	try {
		const mem = require('./lib/utils/ram');
		res.render('mem_info', {
			title  : 'Memories Information',
			slogan : 'Get information about PC\'s memories',
			data   : await mem.memInfo(),
		});
	} catch (e) {
		console.error(e);
	}
});


/**
 * @summary get ram's statistic
 */

app.get('/ram/mem_stats', async (req, res) => {
	try {
		const mem = require('./lib/utils/ram');
		const memStats = io.of('/mem_stats');
		res.render('mem_stats', {
			title  : 'RAM Statistic',
			slogan : 'Get RAM statistic',
			data   : await mem.memStats(),
		});
		setInterval(async () => memStats.emit('reload', await mem.memStats()), 2500);
	} catch (e) {
		console.error(e);
	}
});


/**
 * @summary Render section about cpu
 */

app.get('/cpu', (req, res) => {
	try {
		const template = require('./lib/templates/cpu');
		res.render('cpu', {
			title  : 'CPU',
			slogan : 'Get data about your processor',
			blocks : template,
		});
	} catch (e) {
		console.error(e);
	}
});


/**
 * @summary Get CPU's characteristics
 */

app.get('/cpu/cpu_info', async (req, res) => {
	try {
		const cpu = require('./lib/utils/cpu');
		const cpuInfo = io.of('/cpu_info');
		res.render('cpu_info', {
			title  : 'CPU\'s Characteristics',
			slogan : 'Find out what your processor is capable of',
			data   : await cpu.cpuInfo(),
		});
		setInterval(async () => cpuInfo.emit('reload', await cpu.cpuInfo()), 2500);
	} catch (e) {
		console.error(e);
	}
});


/**
 * @summary Get CPU's speed characteristics
 */

app.get('/cpu/cpu_speed', async (req, res) => {
	try {
		const cpu = require('./lib/utils/cpu');
		const speed = io.of('/cpu_speed');
		res.render('cpu_speed', {
			title  : ' CPU\'s speed',
			slogan : 'Get real-time processor speed statistics',
			data   : await cpu.cpuSpeed(),
		});
		setInterval(async () => speed.emit('reload', await cpu.cpuSpeed()), 2500);
	} catch (e) {
		console.error(e);
	}
});


/**
 * @summary Render section about Graphics
 */

app.get('/graphics', (req, res) => {
	try {
		const template = require('./lib/templates/graphics.js');
		res.render('graphics', {
			title  : 'Graphics',
			slogan : 'Get data about your graphics card and display',
			blocks : template,
		});
	} catch (e) {
		console.error(e);
	}
});


/**
 * @summary Get GPU's characteristics
 */
app.get('/graphics/gpu', async (req, res) => {
	try {
		const graphics = require('./lib/utils/graphics');
		res.render('gpu', {
			title  : 'GPU\'s Characteristics',
			slogan : 'Find out what your graphics card is capable of',
			data   : await graphics.controllersInfo(),
		});
	} catch (e) {
		console.error(e);
	}
});


/**
 * @summary Get Display's characteristics
 */

app.get('/graphics/display', async (req, res) => {
	try {
		const graphics = require('./lib/utils/graphics');
		res.render('display', {
			title  : 'Display\'s Characteristics',
			slogan : 'Information about display (monitor)',
			data   : await graphics.displaysInfo(),
		});
	} catch (e) {
		console.error(e);
	}
});



/**
 * @summary Render section about CPU's load and running processes
 */

app.get('/graphs', (req, res) => {
	try {
		const template = require('./lib/templates/processes');
		res.render('graphs', {
			title  : 'Graphs',
			slogan : 'See PC\'s peripheral indicators',
			blocks : template,
		});
	} catch (e) {
		console.error(e);
	}
});

app.get('/graphs/cpu_load', async (req, res) => {
	try {
		const processes = require('./lib/utils/processes');
		console.log(await processes.cpuLoad());
		res.send('Hello world');
	} catch (e) {
		console.error(e);
	}
});

app.get('/graphs/running_processes', async (req, res) => {
	try {
		const processes = require('./lib/utils/processes');
		console.log(await processes.runningProcesses());
		res.send('Hello world');
	} catch (e) {
		console.error(e);
	}
});

http.listen(8000, () => {

	console.log(chalk.cyan(`
	 $$$$$$\\  $$\\                            $$\\               $$\\
	$$  __$$\\ $$ |                           $$ |              $$ |            
	$$ /  \\__|$$$$$$$\\   $$$$$$\\   $$$$$$\\ $$$$$$\\    $$$$$$\\  $$$$$$$\\        
	$$ |      $$  __$$\\ $$  __$$\\ $$  __$$\\\\_$$  _|   \\____$$\\ $$  __$$\\       
	$$ |      $$ |  $$ |$$$$$$$$ |$$$$$$$$ | $$ |     $$$$$$$ |$$ |  $$ |      
	$$ |  $$\\ $$ |  $$ |$$   ____|$$   ____| $$ |$$\\ $$  __$$ |$$ |  $$ |      
	\\$$$$$$  |$$ |  $$ |\\$$$$$$$\\ \\$$$$$$$\\  \\$$$$  |\\$$$$$$$ |$$ |  $$ |      
	 \\______/ \\__|  \\__| \\_______| \\_______|  \\____/  \\_______|\\__|  \\__|
	
	
	
	 $$$$$$\\             $$$$$$\\    $$\\                                                 
	$$  __$$\\           $$  __$$\\   $$ |                                                
	$$ /  \\__| $$$$$$\\  $$ /  \\__|$$$$$$\\   $$\\  $$\\  $$\\  $$$$$$\\   $$$$$$\\   $$$$$$\\  
	\\$$$$$$\\  $$  __$$\\ $$$$\\     \\_$$  _|  $$ | $$ | $$ | \\____$$\\ $$  __$$\\ $$  __$$\\ 
	 \\____$$\\ $$ /  $$ |$$  _|      $$ |    $$ | $$ | $$ | $$$$$$$ |$$ |  \\__|$$$$$$$$ |
	$$\\   $$ |$$ |  $$ |$$ |        $$ |$$\\ $$ | $$ | $$ |$$  __$$ |$$ |      $$   ____|
	\\$$$$$$  |\\$$$$$$  |$$ |        \\$$$$  |\\$$$$$\\$$$$  |\\$$$$$$$ |$$ |      \\$$$$$$$\\ 
	 \\______/  \\______/ \\__|         \\____/  \\_____\\____/  \\_______|\\__|       \\_______|
		
                                                                                   
                      ██                      
            ██          ██                    
          ██          ████                    
          ██        ██████████                
          ██████    ████████████              
          ████████    ██████████        ██    
        ██████████    ██████████          ██  
        ██████████    ██████████        ████  
        ████████████  ████████        ████████
          ██████████    ████        ██████████
  ██        ██████                  ██████████
██                                ████████████
██  ████                          ████████████
██████████                          ████████  
████████████          ██████████      ████    
  ████████████      ██████████████            
  ████████████    ██████████████████          
    ██████████    ██████████████████████                   Listen on: http://127.0.0.1:8000
      ██████      ████████████████████████                            http://localhost:8000
                  ██████████████████████████  
                ████████████████████████████  
              ████████████████████████████    
              ██████████████████████████      
                ████████████████████          
                  ██████████████                 
	`));
});

