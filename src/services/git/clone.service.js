const { APIResponse } = require('../../utils');
const { asyncTerminal } = require('../terminal');

const clone = (url, file_path) => {
  const command = `git -C ${file_path} clone ${url}`;
  const { stdout, stderr } = await asyncTerminal(command);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  const output = stdout.toString();
  return APIResponse(output);
};

module.exports = clone;
