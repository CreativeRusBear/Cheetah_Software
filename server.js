const express = require('express');
const app = express();
const os = require('os');
const dns = require('dns');
const process = require('process');

app.get('/os_info', (req, res)=>{
  const {COMPUTERNAME, USERNAME} = process.env;
  const platform = process.platform;
  const relese = os.release();
  const type = os.type();
});

app.get('/net_info', (req, res)=>{
  const netInfo = os.networkInterfaces().Ethernet;
  const ipv6Index = netInfo.findIndex((data)=>data.family === 'IPv6');
  const ipv4Index = netInfo.findIndex((data)=>data.family === 'IPv4');

  const ipv6 = {address: netInfo[ipv6Index].address};
  const ipv4 = netInfo[ipv4Index];

  const domain = process.env.USERDOMAIN;
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
