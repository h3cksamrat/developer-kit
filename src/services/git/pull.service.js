const { APIResponse } = require('../../utils');
const { asyncTerminal } = require('../terminal');

const pull = async({ branch = 'main', remote = 'origin' }) => {
  const command = `git pull ${remote} ${branch}`;
  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  const output = stdout.toString();
  return APIResponse(output);
};

module.exports = pull;
