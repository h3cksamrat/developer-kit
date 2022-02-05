const util = require('util');
const childProcess = require('child_process');
const exec = util.promisify(childProcess.exec);
const { execSync } = childProcess;
process.env.ComSpec = 'C:\\Program Files\\Git\\bin\\bash.exe';

const platforms = {
  win32: 'WINDOWS',
  darwin: 'MAC',
  linux: 'LINUX',
};

/**
 * Get Platform Name
 * @returns {String}
 */
const getCurrentPlatform = () => platforms[process.platform];

/**
 * runs asynchronous command
 * @param {String} cmd
 * @param {Object} options - child_process.exec options
 * @returns {Promise<Object>}
 */
const asyncTerminal = async (cmd, options) => {
  const { stdout, stderr } = await exec(cmd, options);
  return { stdout, stderr };
};

/**
 * runs synchronous command
 * @param {String} cmd - command
 * @param {Object} options - child_process.execSync options
 * @returns {String} - stdout
 */
const syncTerminal = (cmd, options) => {
  const stdout = execSync(cmd, options);
  return stdout.toString();
};

module.exports = {
  getCurrentPlatform,
  asyncTerminal,
  syncTerminal,
};
