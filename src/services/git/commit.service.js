const { APIResponse } = require('../../utils');
const { asyncTerminal } = require('../terminal');

const commit = (message) => {
  const command = 'git commit -m ' + message.trim();
  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  const output = stdout.toString();
  return APIResponse(output);
};

module.exports = commit;
