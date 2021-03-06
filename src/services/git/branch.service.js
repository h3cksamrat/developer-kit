const { removeNullOrEmpty, spaceInBetween, APIResponse } = require('../../utils');
const { asyncTerminal, syncTerminal } = require('../terminal');

const getAllBranches = async (repoPath, optns = { remote: false, currentIndication: false }) => {
  let command = `cd ${repoPath} && ` + (optns.remote ? 'git branch -r' : 'git branch');

  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  let output = stdout.toString();
  output = removeNullOrEmpty(output.split('\n')).map((branch) => branch.trim());
  if (!optns.currentIndication) {
    const currentBranch = (await getCurrentBranch()).message;
    output.splice(output.indexOf(`* ${currentBranch}`), 1, currentBranch);
  }
  return APIResponse(output);
};

const getCurrentBranch = async (repoPath) => {
  const command = `cd ${repoPath} && ` + 'git branch --show-current';

  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  let output = stdout.toString();
  output = output.split('\n')[0].trim();
  return APIResponse(output);
};

const createBranch = async (repoPath, branch) => {
  branch = branch.trim();
  if (spaceInBetween(branch)) return APIResponse('Invalid Branch Name', true);
  const command = `cd ${repoPath} && ` + `git branch ${branch}`;
  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  return APIResponse(`${branch} created`);
};

const updateBranchName = async (repoPath, oldBranchName, newBranchName) => {
  oldBranchName = oldBranchName.trim();
  newBranchName = newBranchName.trim();
  if (spaceInBetween(oldBranchName) || spaceInBetween(newBranchName)) return APIResponse('Invalid Branch Name', true);
  const command = `cd ${repoPath} && ` + `git branch -m ${oldBranchName} ${newBranchName}`;
  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  return APIResponse(`${oldBranchName} renamed to ${newBranchName}`);
};

const deleteBranch = async (repoPath, branch, force = false) => {
  branch = branch.trim();
  if (spaceInBetween(branch)) return APIResponse('Invalid Branch Name', true);
  const command = `cd ${repoPath} && ` + (force ? `git branch -D ${branch}` : `git branch -d ${branch}`);
  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  const output = stdout.toString();
  return APIResponse(output);
};

const mergeBranches = async (repoPath, mergeTo, mergeFrom) => {
  if (spaceInBetween(mergeTo) || spaceInBetween(mergeFrom)) return APIResponse('Invalid Branch Name', true);
  const localBranches = (await getAllBranches()).message;
  const remoteBranches = (await getAllBranches({ remote: true })).message;
  const allBranches = [...localBranches, ...remoteBranches];
  if (allBranches.indexOf(mergeFrom) === -1 || allBranches.indexOf(mergeTo) === -1)
    return APIResponse('No such branch', true);
  const commands = [`cd ${repoPath} && ` + `git checkout ${mergeTo}`, `cd ${repoPath} && ` + `git merge ${mergeFrom}`];
  try {
    commands.map((cmd, index) => {
      try {
        syncTerminal(cmd);
      } catch (err) {
        console.error(err.toString());
        throw new Error(index);
      }
    });
  } catch (err) {
    return APIResponse('Error occured in: ' + commands[err.message], true);
  }
  return APIResponse('Branch Merged');
};

const setUpStream = async (repoPath, branch, remote) => {
  // recognizes for git pull or push
  const command = `cd ${repoPath} && ` + `git branch --set-upstream-to=${remote}/${branch}`;
  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  const output = stdout.toString();
  return APIResponse(output);
};

module.exports = {
  getAllBranches,
  getCurrentBranch,
  createBranch,
  updateBranchName,
  deleteBranch,
  mergeBranches,
  setUpStream,
};
