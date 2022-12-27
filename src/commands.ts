import { deleteBranch, getLocalBranches, getRemoteBranches } from './utils';
import inquirer from 'inquirer';

/**
 * list all the branches in local that doesn't exist on remote
 */
export const listBranches = async () => {
  const local = await getLocalBranches();
  const remote = await getRemoteBranches();

  const diffBranches = local.flatMap((localBranch: string) => {
    return remote.find((remoteBranch) => remoteBranch === localBranch)
      ? []
      : localBranch;
  });

  if (diffBranches.length <= 0) return;

  inquirer
    .prompt<{ deleteBranches: string[] }>([
      {
        type: 'checkbox',
        message: 'Mark the branches to be removed',
        name: 'deleteBranches',
        choices: diffBranches.map((branchName) => ({ name: branchName })),
        validate(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one branch.';
          }

          return true;
        },
      },
    ])
    .then(({ deleteBranches }) => {
      deleteBranches.forEach((branch) => deleteBranch(branch));
    });
};
