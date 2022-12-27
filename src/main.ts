import { Command } from 'commander';
const program = new Command();

/**
 * Show the help information.
 */
const showHelp = () => program.help();

/**
 * list all the branches in local that doesn't exist on remote
 */
const listBranches = () => {
  console.log('list');
};

/**
 * It's the main function of the code.
 */
export const main = () => {
  program
    .description(
      'CLI to check the local branches that are missing on the remote.'
    )
    .version('0.0.1')
    .option('-h, --help', 'display this info', showHelp)
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
};
