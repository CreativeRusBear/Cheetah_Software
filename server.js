const express = require('express');
const app = express();
const dns = require('dns');
const process = require('process');

// const htmlPath = path.join(`${__dirname}`, 'html');

app.use(express.static(`${__dirname}/static`));
app.get('/', (req, res)=>
  res
      .status(200)
      .sendFile(`${__dirname}/static/index.html`)
);

app.get('/os_info', (req, res)=>{
  const osInfo = require('./lib/os_info');
  res.send(osInfo.generalInfo().then(e=>console.log(e)));
});

app.get('/net_info', (req, res)=>{
  const netInfo = require('./lib/net');
  netInfo.netInterface();
  netInfo.getStats();
  netInfo.connection();

});

app.get('/processor_info', (req, res)=>{
  const {NUMBER_OF_PROCESSORS, PROCESSOR_ARCHITECTURE, PROCESSOR_IDENTIFIER} = process.env;
});

app.get('/memory_info', (req, res)=>{
  const opTotalMem = os.totalmem();
  const opFreeMem = os.freemem();
});

app.listen(8000, ()=>{
  console.log('Listen on http://127.0.0.1:8000');
});
