const { syncTerminal } = require('../terminal');
const { homedir } = require('os');
const { APIResponse } = require('../../utils');

const checkAvailabilityOfSSH = () => {
  try {
    const output = syncTerminal(`ls "${homedir()}/.ssh/"`);
    if (output.indexOf('id_') !== -1) return APIResponse('ssh key present', (extraResp = { isPresent: true }));
  } catch {
    return APIResponse('ssh key not present', true, (extraResp = { isPresent: false }));
  }
};

module.exports = checkAvailabilityOfSSH;
