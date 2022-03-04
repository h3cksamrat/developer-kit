const { APIResponse } = require('../../utils');
const { asyncTerminal } = require('../terminal');

const init = async (repoPath) => {
  const command = `cd ${repoPath} && ` + 'git init';
  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  const output = stdout.toString();
  return APIResponse(output);
};

module.exports = init;
