#!/usr/bin/env node
import { Command } from 'commander';
import { listBranches } from './commands';
const program = new Command();

if (process.argv.length === 0) listBranches();

program
  .description(
    'CLI to check the local branches that are missing on the remote.'
  )
  .version('0.0.1')
  .option('-h, --help', 'display this info', () => program.help())
  .option(
    '-ls, --list',
    "list all the branches in local that doesn't exists on remote",
    listBranches
  )
  .option('-g, --group', 'group by prefix [feature/fix/others]')
  .option('-s, --silent', 'no output, just delete branches')
  .option('-S, --sort <period>', 'sort by years, months or days [xy/xm/xd]')
  .parse(process.argv);

program.opts();
