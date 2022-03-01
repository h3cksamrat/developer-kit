const { syncTerminal, getCurrentPlatform } = require('../terminal');
const { homedir, hostname } = require('os');
const { APIResponse } = require('../../utils');
/**
 * Generates SSH Key pair
 * @returns {Object}
 */
const sshGenerate = () => {
  const sshGenAndAddCommands = [
    `ssh-keygen -t rsa -b 4096 -f "${homedir()}/.ssh/id_rsa" -P "" -C ${hostname()}`,
    `eval "$(ssh-agent -s)" && ssh-add "${homedir()}/.ssh/id_rsa"`,
  ];
  const sshGenAndAddCommandsMAC = [
    `ssh-keygen -t rsa -b 4096 -f "${homedir()}/.ssh/id_rsa" -P "" -C ${hostname()}`,
    `echo -e "Host *\n\tIgnoreUnknown UseKeychain\n\tAddKeysToAgent yes\n\tIdentityFile ~/.ssh/id_rsa" > "${homedir()}/.ssh/config"`,
    `eval "$(ssh-agent -s)" && ssh-add "${homedir()}/.ssh/id_rsa"`,
  ];
  try {
    if (getCurrentPlatform() !== 'MAC') {
      sshGenAndAddCommands.map((cmd) => {
        const output = syncTerminal(cmd);
      });
    } else {
      sshGenAndAddCommandsMAC.map((cmd) => {
        const output = syncTerminal(cmd);
      });
    }
    return APIResponse('ssh created and added');
  } catch (error) {
    return APIResponse(error.toString(), true);
  }
};

module.exports = sshGenerate;
