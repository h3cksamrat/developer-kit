const { exec } = require("child_process");
const platform = {
    win32: 'WINDOWS',
    darwin: 'MAC',
    linux: 'LINUX',
  };
const currentPlatform = platform[process.platform]

/**
 * Te
 */
const macTerminal = (cmd) => exec(cmd, (err, stdout, stderr) => {})
const winTerminal = l;
const linuxTerminal = l;

module.exports = {
    currentPlatform
}

 
