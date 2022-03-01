const { APIResponse, spaceInBetween } = require('../../utils');
const { asyncTerminal } = require('../terminal');

const changeBranch = async (branch) => {
  if (spaceInBetween(branch)) return APIResponse('Invalid Branch Name', true);
  const command = `git checkout ${branch}`;
  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  let output = stdout.toString();
  if (output.indexOf(`Switched to branch '${branch}'`) !== -1) return APIResponse(`Switched to branch '${branch}'`);
  return APIResponse('Something went wrong', true);
};

const createBranch = async (branch, parentBranch) => {
  if (spaceInBetween(branch) || spaceInBetween(parentBranch)) return APIResponse('Invalid Branch Name', true);
  const command = `git checkout -b ${branch} ${parentBranch}`;
  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  let output = stdout.toString();
  if (output.indexOf(`Switched to new branch '${branch}'`) !== -1)
    return APIResponse(`Created and Switched to branch '${branch}'`);
  return APIResponse('Something went wrong', true);
};

module.exports = {
  changeBranch,
  createBranch,
};
