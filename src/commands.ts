import { getLocalBranches, getRemoteBranches } from './utils';

/**
 * list all the branches in local that doesn't exist on remote
 */
export const listBranches = async () => {
  const local = await getLocalBranches();
  const remote = await getRemoteBranches();

  console.log(
    local.flatMap((localBranch: string) => {
      return remote.find((remoteBranch) => remoteBranch === localBranch)
        ? []
        : localBranch;
    })
  );
};
