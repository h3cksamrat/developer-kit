const { syncTerminal } = require('../terminal');
const { homedir } = require('os');

const checkAvailabilityOfSSH = () => {
    const output = syncTerminal(`ls "${homedir()}/.ssh/"`);
    if (output.indexOf('No such file or directory') == -1) {
      if (output.indexOf('id_') !== -1) return { message: 'ssh key present', isPresent: true };
      return { message: 'ssh key not present', isPresent: false };
    }
    return { message: 'ssh key not present', isPresent: false };
  };

module.exports = checkAvailabilityOfSSH