const { fileService } = require('../services/');

const getRepoPath = async () => {
  const paths = await fileService.getRecentGitRepos();
  return paths;
};

const setRepoPath = async (repoPath) => {
  await fileService.addRecentGitRepos(repoPath);
};

module.exports = {
  getRepoPath,
  setRepoPath,
};
