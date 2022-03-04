const { APIResponse, removeNullOrEmpty } = require('../../utils');
const { asyncTerminal } = require('../terminal');

const stageAll = async (repoPath) => {
  const command = `cd ${repoPath} && ` + 'git add .';
  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  const output = stdout.toString();
  return APIResponse(output);
};

const status = async (repoPath) => {
  const symbolAndMeaning = {
    '?': 'untracked',
    M: 'modified',
    A: 'added',
    D: 'deleted',
    R: 'renamed',
    C: 'copied',
    U: 'updated but unmerged',
  };
  const command = `cd ${repoPath} && ` + 'git status -s';
  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }

  const fileStatus = {};
  fileStatus.work = {};
  fileStatus.index = {};
  Object.keys(symbolAndMeaning).forEach((item) => {
    if (item === '?') {
      fileStatus.work.untracked = [];
      return;
    }
    fileStatus.index[symbolAndMeaning[item]] = [];
    fileStatus.work[symbolAndMeaning[item]] = [];
  });

  const output = removeNullOrEmpty(stdout.toString().split('\n'));
  output.forEach((item) => {
    const [file, ...status] = item.split(' ').reverse();
    const [indexStatus, treeStatus] = status.length !== 2 ? status[0].split('') : status.reverse();
    console.log({ status, file, indexStatus, treeStatus });
    if (indexStatus == '?' && treeStatus == '?') {
      fileStatus.work.untracked.push(file);
      return;
    }
    if (indexStatus !== '') {
      fileStatus.index[symbolAndMeaning[indexStatus]].push(file);
    }
    if (treeStatus !== '') {
      fileStatus.work[symbolAndMeaning[treeStatus]].push(file);
    }
  });
  return APIResponse(fileStatus);
};

const stageFile = async (repoPath, file) => {
  const command = `cd ${repoPath} && ` + `git add ${file}`;
  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  const output = stdout.toString();
  return APIResponse(output);
};

const restoreFile = async (repoPath, file, staged = true) => {
  const command = `cd ${repoPath} && ` + (staged ? `git restore --staged ${file}` : `git restore ${file}`);
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
  stageFile,
  restoreFile,
  stageAll,
  status,
};
