const { syncTerminal } = require('../terminal');
const { homedir } = require('os');

const checkAvailabilityOfSSH = () => {
  try {
    const output = syncTerminal(`ls "${homedir()}/.ssh/"`);
    if (output.indexOf('id_') !== -1) return { message: 'ssh key present', isPresent: true };
  } catch {
    return { message: 'ssh key not present', isPresent: false };
  }
};

module.exports = checkAvailabilityOfSSH;
