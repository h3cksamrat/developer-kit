const { syncTerminal } = require('../terminal');
const { homedir } = require('os');
const checkAvailabilityOfSSH = require('./checkSSH.service');
const { APIResponse } = require('../../utils');

const getPublicKey = () => {
  if (!checkAvailabilityOfSSH().isPresent) {
    return APIResponse('Public key not found', true);
  }
  const key = syncTerminal(`cat "${homedir()}/.ssh/id_rsa.pub"`);
  return APIResponse(key);
};

module.exports = getPublicKey;
