const { syncTerminal } = require('../terminal');
const { isObjectEmpty } = require('../../utils');

/**
 * Git push
 * @param {Object} pushInfo
 * @param {String} pushInfo.branch
 * @param {String} pushInfo.remoteUrl - git remote alias
 * @param {Object} pushOptions
 * @param {Boolean} pushOptions.force - force push
 * @returns {String} - git push output
 */
const push = (
  pushInfo = {
    branch: 'main',
    remoteUrl: 'origin',
  },
  pushOptions = {}
) => {
  let pushCmd = `git push ${pushInfo.remoteUrl} ${pushInfo.branch}`;
  if (isObjectEmpty(pushOptions)) return syncTerminal(pushCmd);
  if (pushOptions.force) {
    pushCmd += ' -f';
  }
  return syncTerminal(pushCmd);
};
module.exports = push;
