const addRecentGitRepos = async (repoPath) => {
  const db = (await import('../db/database.mjs')).default;
  (async () => {
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
  })();
};

const getRecentGitRepos = async (length = 5) => {
  const db = (await import('../db/database.mjs')).default;
  return await (async () => {
    await db.read();
    const { recentGitReposPath } = await db.data;
    return recentGitReposPath.slice(0, length - 1);
  })();
};

module.exports = {
  addRecentGitRepos,
  getRecentGitRepos,
};
