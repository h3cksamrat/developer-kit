const { APIResponse } = require('../../utils');
const { asyncTerminal } = require('../terminal');

const clone = async (url, file_path) => {
  const command = `git -C ${file_path} clone ${url} --progress`;
  const { stdout, stderr, error } = await asyncTerminal(command);
  let output;
  if (!error) {
    output = stdout.toString().split('\n');
    return APIResponse('Completed');
  }
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  output = stdout.toString().split('\n');
  return APIResponse('Completed');
};

module.exports = clone;
