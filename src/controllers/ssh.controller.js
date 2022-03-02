const { sshService } = require('../services/');

const setupSSH = () => {
  if (!sshService.checkSSH().isPresent) {
    sshService.sshGeneration();
  }
  return sshService.getPublicKey();
};

module.exports = {
  setupSSH,
};
