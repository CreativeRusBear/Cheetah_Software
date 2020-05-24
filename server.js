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
 *
 */

/**
 * @author Artem Gusev <gusev2014russia@mail.ru> (CreativeRusBear)
 * @copyright Artem Gusev 2019
 * @licence
 * MIT License
 *
 * Copyright (c) 2019-present Artem Gusev
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const chalk = require('chalk');


/**
 * @description Pug settings
 */
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/public/views'));

app.use(express.static(`${__dirname}/public`));

/**
 * @description load section for main page
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
		throw e;
	}
});


const hardwareRouter = express.Router();
app.use('/hardware', hardwareRouter);

/**
 * @description Load section about hardware
 */
hardwareRouter.get('/', (req, res) => {
	try {
		const template = require('./lib/templates/hardware');
		res.render('hardware', {
			title  : 'Hardware',
			slogan : 'Get data about hardware',
			blocks : template,
		});
	} catch (e) {
		throw e;
	}
});

/**
 * @description Load data about motherboard's characteristics
 */
hardwareRouter.get('/motherboard', async (req, res) => {
	try {
		const motherboardInfo = await require('./lib/utils/hardware').motherboard();
		res.render('motherboard', {
			title  : 'Motherboard',
			slogan : 'Get system characteristics of motherboard',
			data   : motherboardInfo,
		});
	} catch (e) {
		throw e;
	}
});


/**
 * @description Load data about motherboard's characteristics
 */
hardwareRouter.get('/bios', async (req, res) => {
	try {
		const biosInfo = await require('./lib/utils/hardware').bios();
		res.render('bios', {
			title  : 'BIOS',
			slogan : 'Get info about BIOS',
			data   : biosInfo,
		});
	} catch (e) {
		throw e;
	}
});


/**
 * @description load data about your os
 */
app.get('/os', async (req, res) => {
	try {
		const osInfo = await require('./lib/utils/os').generalInfo();
		res.render('os', {
			title  : 'OS',
			slogan : 'Get data about your operating system',
			data   : osInfo,
		});
	} catch (e) {
		throw e;
	}
});


const networkRouter = express.Router();
app.use('/network', networkRouter);

/**
 * @description load articles about network
 */
networkRouter.get('/', (req, res) => {
	try {
		const template = require('./lib/templates/net');
		res.render('network', {
			title  : 'Network',
			slogan : 'Get data about ip address, mask and etc.',
			blocks : template,
		});
	} catch (e) {
		throw e;
	}
});

/**
 * @description load data about net interface
 */
networkRouter.get('/net_interface', async (req, res) => {
	try {
		const netInfo = require('./lib/utils/net');
		res.render('net_interface', {
			title  : 'Network Interface',
			slogan : 'Get data about network interface',
			data   : await netInfo.netInterface(),
		});
	} catch (e) {
		throw e;
	}
});

/**
 * @description load network's stats
 */
networkRouter.get('/net_stats', async (req, res) => {
	try {
		const netInfo = require('./lib/utils/net');
		const net = io.of('/network_stats');

		res.render('net_stats', {
			title  : 'Network Stats',
			slogan : 'Get data about current network stats',
			data   : await netInfo.getStats(),
		});
		const interval = setInterval(async () =>
			net.emit('network_stats', await netInfo.getStats()), 500);
	} catch (e) {
		throw e;
	}
});

const diskRouter = express.Router();
app.use('/disks', diskRouter);

/**
 * @description load disks section
 */
diskRouter.get('/', (req, res) => {
	try {
		const template = require('./lib/templates/disk');
		res.render('disks', {
			title  : 'Disks',
			slogan : 'Get all data disk structure and etc.',
			blocks : template,
		});
	} catch (e) {
		throw e;
	}
});

/**
 * @description load data about physical disk layout
 */
diskRouter.get('/disk_layout', async (req, res) => {
	try {
		const diskStructure = await require('./lib/utils/disks').physicalDiskStructure();
		res.render('disk_layout', {
			title  : 'Disks Layout',
			slogan : 'Get data about physical disk layout',
			data   : diskStructure,
		});
	} catch (e) {
		throw e;
	}
});

/**
 * @description load data about disks, partitions, raids and roms
 */
diskRouter.get('/block_devices', async (req, res) => {
	try {
		const dprr = await require('./lib/utils/disks').dprrInfo();
		res.render('block_devices', {
			title  : 'Disks, partitions, raids and roms',
			slogan : 'Get data about disks, partitions, raids and roms',
			data   : dprr,
		});
	} catch (e) {
		throw e;
	}
});

/**
 * @description load data about current file systems
 */
diskRouter.get('/fs_stats', async (req, res) => {
	try {
		const disksInfo = require('./lib/utils/disks');
		const fsData = io.of('/fs_stats');
		res.render('fs_stats', {
			title  : 'Current stats about file systems',
			slogan : 'Get current transfer stats of your disks',
			data   : await disksInfo.fsInfo(),
		});
		const interval = setInterval(async () =>
			fsData.emit('fs_data', await disksInfo.fsInfo()), 500);
	} catch (e) {
		throw e;
	}
});

const ramRouter = express.Router();
app.use('/ram', ramRouter);

/**
 * @description render section about computer's memory
 */
ramRouter.get('/', (req, res) => {
	try {
		const template = require('./lib/templates/ram');
		res.render('ram', {
			title  : 'RAM',
			slogan : 'Get data about PC\'s memories',
			blocks : template,
		});
	} catch (e) {
		throw e;
	}
});

/**
 * @description get data about memory
 */
ramRouter.get('/mem_info', async (req, res) => {
	try {
		const memoryInfo = await require('./lib/utils/ram').memInfo();
		res.render('mem_info', {
			title  : 'Memories Information',
			slogan : 'Get information about PC\'s memories',
			data   : memoryInfo,
		});
	} catch (e) {
		throw e;
	}
});

/**
 * @description get ram's statistic
 */
ramRouter.get('/mem_stats', async (req, res) => {
	try {
		const mem = require('./lib/utils/ram');
		const memStats = io.of('/mem_stats');
		res.render('mem_stats', {
			title  : 'RAM Statistic',
			slogan : 'Get RAM statistic',
			data   : await mem.memStats(),
		});
		const interval = setInterval(async () => memStats.emit('reload', await mem.memStats()), 500);
	} catch (e) {
		throw e;
	}
});

const cpuRouter = express.Router();
app.use('/cpu', cpuRouter);

/**
 * @description Render section about cpu
 */
cpuRouter.get('/', (req, res) => {
	try {
		const template = require('./lib/templates/cpu');
		res.render('cpu', {
			title  : 'CPU',
			slogan : 'Get data about your processor',
			blocks : template,
		});
	} catch (e) {
		throw e;
	}
});

/**
 * @description Get CPU's characteristics
 */
cpuRouter.get('/cpu_info', async (req, res) => {
	try {
		const cpu = require('./lib/utils/cpu');
		const cpuInfo = io.of('/cpu_info');
		res.render('cpu_info', {
			title  : 'CPU\'s Characteristics',
			slogan : 'Find out what your processor is capable of',
			data   : await cpu.cpuInfo(),
		});
		const interval = setInterval(async () => cpuInfo.emit('reload', await cpu.cpuInfo()), 500);
	} catch (e) {
		throw e;
	}
});

/**
 * @description Get CPU's speed characteristics
 */
cpuRouter.get('/cpu_speed', async (req, res) => {
	try {
		const cpu = require('./lib/utils/cpu');
		const speed = io.of('/cpu_speed');
		res.render('cpu_speed', {
			title  : ' CPU\'s speed',
			slogan : 'Get real-time processor speed statistics',
			data   : await cpu.cpuSpeed(),
		});
		const interval = setInterval(async () => speed.emit('reload', await cpu.cpuSpeed()), 500);
	} catch (e) {
		throw e;
	}
});

const gpuRouter = express.Router();
app.use('/graphics', gpuRouter);

/**
 * @description Render section about Graphics
 */
gpuRouter.get('/', (req, res) => {
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
 * @description Get GPU's characteristics
 */
gpuRouter.get('/gpu', async (req, res) => {
	try {
		const controllers = await require('./lib/utils/graphics').controllersInfo();
		res.render('gpu', {
			title  : 'GPU\'s Characteristics',
			slogan : 'Find out what your graphics card is capable of',
			data   : controllers,
		});
	} catch (e) {
		throw e;
	}
});

/**
 * @description Get Display's characteristics
 */
gpuRouter.get('/display', async (req, res) => {
	try {
		const displays = await require('./lib/utils/graphics').displaysInfo();
		res.render('display', {
			title  : 'Display\'s Characteristics',
			slogan : 'Information about display (monitor)',
			data   : displays
		});
	} catch (e) {
		throw e;
	}
});

const graphRouter = express.Router();
app.use('/graphs', graphRouter);

/**
 * @description Render section about CPU's load and running processes
 */
graphRouter.get('/', (req, res) => {
	try {
		const template = require('./lib/templates/processes');
		res.render('graphs', {
			title  : 'Graphs',
			slogan : 'See PC\'s peripheral indicators',
			blocks : template,
		});
	} catch (e) {
		throw e;
	}
});

/**
 * @description Show CPU's usage statistics
 */
graphRouter.get('/cpu_load', async (req, res) => {
	try {
		const processes = require('./lib/utils/processes');
		const cpuLoad = io.of('/cpu_load');
		res.render('cpu_load', {
			title  : 'CPU current load',
			slogan : 'Get CPU\'s usage statistics',
			data   : await processes.cpuLoad(),
		});
		const interval = setInterval(async () => cpuLoad.emit('reload', await processes.cpuLoad()), 500);
	} catch (e) {
		throw e;
	}
});

/**
 * @description Show info about running processes
 */
graphRouter.get('/running_processes', (req, res) => {
	try {
		res.render('warning', {
			title  : 'Running processes',
			slogan : 'View information about running processes',
		});
	} catch (e) {
		throw e;
	}
});

/*
 * App.use((req, res) => {
 * 	try {
 * 		res.sendStatus(404);
 * 		res.render('404.pug');
 * 	} catch (e) {
 * 		console.error(e);
 * 	}
 * });
 */

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

