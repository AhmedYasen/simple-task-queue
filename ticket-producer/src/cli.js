#!/usr/bin/env node

const yargs = require("yargs");

//commands:
/*
 * Commands:
 * - serve
 * - enqueue -t [taskType] -p [taskParameters]
 * - list -id [id]      (status of specific task)
 * - list               (status of all tasks)
 * 
*/
process.removeAllListeners('warning')
const args = yargs
    .scriptName("ticket")
    .usage("$0 <command> [options]")
    .command(require("../commands/serve"))
    .command(require("../commands/enqueue"))
    .command(require("../commands/list"))
    .demandCommand(1)
    .help()
    .argv;
