const { APIResponse, removeNullOrEmpty } = require('../../utils');
const { asyncTerminal } = require('../terminal');

const stageAll = async () => {
  const command = 'git add .';
  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  const output = stdout.toString();
  return APIResponse(output);
};

const status = async () => {
  const symbolAndMeaning = { '??': 'untracked', M: 'modified', A: 'added', AM: 'added and modified' };
  const command = 'git status -s';
  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }

  const finalOutput = {};
  Object.keys(symbolAndMeaning).forEach((item) => {
    finalOutput[symbolAndMeaning[item]] = [];
  });

  const output = removeNullOrEmpty(stdout.toString().split('\n'));
  output.forEach((item) => {
    const [status, file] = removeNullOrEmpty(item.split(' '));
    finalOutput[symbolAndMeaning[status]].push(file);
  });
  return APIResponse(finalOutput);
};

const stageFile = async (file) => {
  const command = `git add ${file}`;
  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  const output = stdout.toString();
  return APIResponse(output);
};

const restoreFile = async (file, staged = true) => {
  const command = staged ? `git restore --staged ${file}` : `git restore ${file}`;
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
