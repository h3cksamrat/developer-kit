const db = require('../db/database');

const addRecentGitRepos = async (repoPath) => {
  await db.read();
  let { recentGitReposPath } = await db.data;
  if (!recentGitReposPath) {
    db.data = { recentGitReposPath: [repoPath] };
    await db.write();
  } else {
    if (recentGitReposPath.indexOf(repoPath) !== -1) {
      recentGitReposPath.splice(recentGitReposPath.indexOf(repoPath), 1);
    }
    recentGitReposPath.unshift(repoPath);
  }
  await db.write();
};

const getRecentGitRepos = async (length = 5) => {
  await db.read();
  const { recentGitReposPath } = await db.data;
  return recentGitReposPath.slice(0, length - 1);
};

module.exports = {
  addRecentGitRepos,
  getRecentGitRepos,
};
