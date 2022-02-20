const { syncTerminal} = require('../terminal');
const { homedir} = require('os');
const checkAvailabilityOfSSH = require("./checkSSH.service");

const getPublicKey = () => {
    if (!checkAvailabilityOfSSH().isPresent) {
        throw new Error("public ssh key not present")
    }
    return syncTerminal(`cat "${homedir()}/.ssh/id_rsa.pub"`);
  };

module.exports = getPublicKey;
