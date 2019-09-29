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
  const template = require('./lib/template');
  res.render('index', {
    title: 'Cheetah Software',
    slogan: 'Get more data about your PC',
    blocks: template,
  });
});

/**
 * @summary load data about your os
 */
app.get('/os', async (req, res) => {
  try {
    const osInfo = require('./lib/os_info');
    const data = await osInfo.generalInfo();
    res.render('os', {
      title: 'OS',
      slogan: 'Get data about your operating system',
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
    const netInfo = require('./lib/net');
    const net = io.of('/network');

    res.render('network', {
      title: 'Network',
      slogan: 'Get data about ip address, mask and etc.',
      data: {...await netInfo.netInterface(), ...await netInfo.getStats()},
    });
    setInterval(async ()=>
        net.emit('network_stats', await netInfo.getStats()), 2500);
  } catch (e) {
    console.error(e);
  }
});

/**
 * @summary load disks data
 */
app.get('/disks', async (req, res) => {
  try {
    const template = require('./lib/disk_template');
    res.render('disks', {
      title: 'Disks',
      slogan: 'Get all data disk structure and etc.',
      blocks: template,
    });
  } catch (e) {
    console.error(e);
  }
});

app.get('/disks/disk_layout', async (req, res) =>{
  try {
    const disksInfo = require('./lib/disks');
    res.render('disk_layout', {
      title: 'Disks Layout',
      slogan: 'Get data about physical disk layout',
      data: await disksInfo.physicalDiskStructure(),
    });
  } catch (e) {
    console.error(e);
  }
});


app.get('/processor_info', (req, res) => {
  const {NUMBER_OF_PROCESSORS, PROCESSOR_ARCHITECTURE, PROCESSOR_IDENTIFIER} = process.env;
});

app.get('/memory_info', (req, res) => {
  const opTotalMem = os.totalmem();
  const opFreeMem = os.freemem();
});

app.get('/disks_info', (req, res) => {
  const disksInfo = require('./lib/disks');
  disksInfo;
});

http.listen(8000, () => {
  console.log('Listen on http://127.0.0.1:8000');
});
