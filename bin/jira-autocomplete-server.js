#!/usr/bin/env node
const { Command } = require('commander');
const package = require('../package.json');
const log = require('loglevel');

const program = new Command();

program
  .option(
    '--node-ipc',
    'language server is run by nodejs and using node IPC for connection',
  )
  .option(
    '--stdio',
    'language server is spawned with an executable command while using stdio for connection',
  )
  .version(package.version)
  .parse(process.argv);

if (program.stdio) {
  log.info('running in stdio mode');
  return require('../dist/index');
} else if (program.nodeIpc) {
  log.info('running in nodeIpc mode');
  return require('../dist/index');
}

program.help();
