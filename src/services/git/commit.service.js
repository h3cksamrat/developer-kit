const { syncTerminal } = require("../terminal")

const commit = (message) => {
    let commitCmd = "git commit -m " + message.trim()
    const output = syncTerminal(commitCmd);
    return output
}

module.exports = commit