const { syncTerminal, getCurrentPlatform } = require('./terminal');
const { homedir, hostname } = require('os');
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
    return { message: 'ssh created and added' };
  } catch (error) {
    return {
      message: 'error',
    };
  }
};

const getPublicSSHKey = () => syncTerminal(`cat "${homedir()}/.ssh/id_rsa.pub"`);

const checkAvailabilityOfSSH = () => {
  const output = syncTerminal(`ls "${homedir()}/.ssh/"`);
  if (output.indexOf('No such file or directory') == -1) {
    if (output.indexOf('id_') !== -1) return { message: 'ssh key present', isPresent: true };
    return { message: 'ssh key not present', isPresent: false };
  }
  return { message: 'ssh key not present', isPresent: false };
};

const sshSetup = () => {
  if (!checkAvailabilityOfSSH()) {
    sshGenerate();
    return getPublicSSHKey();
  }
  return getPublicSSHKey();
};

module.exports = {
  sshGenerate,
  getPublicSSHKey,
  checkAvailabilityOfSSH,
  sshSetup,
};
