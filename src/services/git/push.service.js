const { APIResponse } = require('../../utils');
const { asyncTerminal } = require('../terminal');

/**
 * Git push
 * @param {Object} pushInfo
 * @param {String} pushInfo.branch
 * @param {String} pushInfo.remoteUrl - git remote alias
 * @param {Object} pushOptions
 * @param {Boolean} pushOptions.force - force push
 * @returns {Promise<{message: any;error: boolean;}>} - git push output
 */
const push = async (
  repoPath,
  pushInfo = {
    branch: 'main',
    remoteUrl: 'origin',
  },
  pushOptions = {}
) => {
  let pushCmd = `cd ${repoPath} && ` + `git push ${pushInfo.remoteUrl} ${pushInfo.branch}`;
  if (pushOptions.force) {
    pushCmd += ' -f';
  }
  const { stdout, stderr } = await asyncTerminal(pushCmd);
  if (stderr) {
    const error = stderr.toString();
    console.error(error);
    return APIResponse(error, true);
  }
  const output = stdout.toString();
  return APIResponse(output);
};
module.exports = push;
