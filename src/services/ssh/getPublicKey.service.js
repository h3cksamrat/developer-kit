const { syncTerminal } = require('../terminal');
const { homedir } = require('os');
const { APIResponse } = require('../../utils');

const getPublicKey = () => {
  const key = syncTerminal(`cat "${homedir()}/.ssh/id_rsa.pub"`);
  return APIResponse(key);
};

module.exports = getPublicKey;
