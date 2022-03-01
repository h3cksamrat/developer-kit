const {sshGeneration, checkSSH, getPublicKey} = require("../services/ssh")

const setupSSH = () => {
    if (!checkSSH().isPresent) {
        sshGeneration();
    }
    return getPublicKey();
}

module.exports = {
    setupSSH
}