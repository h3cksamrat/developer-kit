const {syncTerminal} = require('../terminal')

const clone = (url, file_path) => {
  const cloneCmd = `git -C ${file_path} clone ${url}`
  return syncTerminal(cloneCmd)
}

module.exports = clone;