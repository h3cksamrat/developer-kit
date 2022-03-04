const { APIResponse, removeNullOrEmpty } = require('../../utils');
const { asyncTerminal } = require('../terminal');

const getRemoteNames = async (repoPath) => {
  const command = `cd ${repoPath} && ` + 'git remote';
  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  const output = removeNullOrEmpty(stdout.toString().split('\n'));
  return APIResponse(output);
};

const createRemote = async (repoPath, { name, url }) => {
  const command = `cd ${repoPath} && ` + `git remote add ${name} ${url}`;
  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  const output = stdout.toString();
  return APIResponse(output);
};

const renameRemote = async (repoPath, { oldName, newName }) => {
  const command = `cd ${repoPath} && ` + `git remote rename ${oldName} ${newName}`;
  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  const output = stdout.toString();
  return APIResponse(output);
};

const removeRemote = async (repoPath, remote) => {
  const command = `cd ${repoPath} && ` + `git remote remove ${remote}`;
  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  const output = stdout.toString();
  return APIResponse(output);
};

const getRemoteUrl = async (repoPath, remote) => {
  const command = `cd ${repoPath} && ` + `git remote get-url ${remote}`;
  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  const output = stdout.toString();
  return APIResponse(output);
};

const setRemoteUrl = async (repoPath, { remote, url }) => {
  const command = `cd ${repoPath} && ` + `git remote set-url ${remote} ${url}`;
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
  getRemoteNames,
  createRemote,
  renameRemote,
  removeRemote,
  getRemoteUrl,
  setRemoteUrl,
};
