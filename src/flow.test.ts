import child_process from 'child_process';
import os from 'os';
import fs from 'fs';
import path from 'path';
import assert from 'assert';

let tempdir: string;
let bareDir: string;
let workingDir: string;

const setup = () => {
  const tmp = os.tmpdir();
  tempdir = fs.mkdtempSync(tmp + path.sep + 'git-clean-branches-');
  bareDir = tempdir + path.sep + 'bare';
  workingDir = tempdir + path.sep + 'working';

  fs.mkdirSync(bareDir);

  console.log('Using "' + tempdir + '" dir');

  // create bare repository
  child_process.execSync('git init --bare', { cwd: bareDir });

  // clone repository
  child_process.execSync('git clone bare working', { cwd: tempdir });

  // create Initial commit
  fs.writeFileSync(workingDir + path.sep + 'lollipop', 'lollipop content');
  child_process.execSync('git add lollipop', { cwd: workingDir });
  child_process.execSync('git commit -m "inital commit"', { cwd: workingDir });

  // create new branch, which will be deleted by -d flag
  child_process.execSync('git branch feature/fast-forwarded', {
    cwd: workingDir,
  });
  // create another branch with special character
  child_process.execSync('git branch "#333-work"', { cwd: workingDir });
  // create new branch, which can be deleted only with -D flag
  child_process.execSync('git checkout -b no-ff', { cwd: workingDir });
  // update file content
  fs.writeFileSync(
    workingDir + path.sep + 'lollipop',
    'lollipop content changed'
  );
  child_process.execSync('git commit -a -m "second commit"', {
    cwd: workingDir,
  });

  // push all the branches to the remote and update config
  child_process.execSync('git push origin -u master', { cwd: workingDir });
  child_process.execSync('git push origin -u feature/fast-forwarded', {
    cwd: workingDir,
  });
  child_process.execSync('git push origin -u no-ff', { cwd: workingDir });
  child_process.execSync('git push origin -u "#333-work"', { cwd: workingDir });

  // remove all the branches from the remote
  child_process.execSync('git push origin :feature/fast-forwarded', {
    cwd: workingDir,
  });
  child_process.execSync('git push origin :no-ff', { cwd: workingDir });
  child_process.execSync('git push origin :"#333-work"', { cwd: workingDir });

  // checkout master branch
  child_process.execSync('git checkout master', { cwd: workingDir });
};

const test_nothing = function () {
  const output = child_process.execFileSync(
    'node',
    [__dirname + path.sep + 'index.js'],
    {
      cwd: workingDir,
      encoding: 'utf8',
    }
  );

  assert.notEqual(output.indexOf('- #333-work'), -1);
  assert.notEqual(output.indexOf('- feature/fast-forwarded'), -1);
  assert.notEqual(output.indexOf('- no-ff'), -1);
};

test.skip('the flow', () => {
  setup();
  test_nothing();
});
