const { syncTerminal } = require("../terminal")

const pull = ({branch="main", remote="origin"}) => {
    let commitCmd = "git pull " + remote + branch;
    const output = syncTerminal(commitCmd);
    return output
}

module.exports = pull