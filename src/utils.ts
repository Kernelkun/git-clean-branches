import { exec as childExec, ExecException } from 'child_process';

/**
 * Execute a shell command.
 * @param command The shell command to be executed.
 * @return A Promise with the output/errors.
 */
const exec = (command: string) =>
  new Promise<{ error: ExecException | null; stdout: string; stderr: string }>(
    (resolve, reject) =>
      childExec(command, (error, stdout, stderr) => {
        if (error) {
          reject(`error: ${error.message}`);
        }
        if (stderr) {
          reject(`stderr: ${stderr}`);
        }
        resolve({ error, stdout, stderr });
      })
  );

/**
 * Split the stdout output and will take out all the empty lines
 * @param stdout The stdout output of the child process.
 * @param prefix A prefix to be ignored.
 * @return An array with the branches.
 */
const split = (stdout: string, prefix = '') => {
  return stdout
    .split('\n')
    .flatMap((line) =>
      line.length > 0 ? line.trim().replace('* ', '').replace(prefix, '') : []
    );
};

/**
 * List all the remote branches.
 * @return An array with the remote branches.
 */
export const getRemoteBranches = async () => {
  try {
    const { stdout } = await exec(`git branch -r`);
    return split(stdout, 'origin/');
  } catch {
    throw new Error('Error getting remote branches.');
  }
};

/**
 * List all the local branches.
 * @return An array with the local branches.
 */
export const getLocalBranches = async () => {
  try {
    const { stdout } = await exec(`git branch`);
    return split(stdout);
  } catch {
    throw new Error('Error getting remote branches.');
  }
};
/**
 * Delete local branches.
 * @param branch The branch to be deleted.
 * @return A boolean.
 */
export const deleteBranch = async (branch: string) => {
  try {
    const { stdout } = await exec(`git branch --delete ${branch}`);
    return stdout.trim();
  } catch {
    throw new Error(`Error deleting local branch: ${branch}.`);
  }
};
