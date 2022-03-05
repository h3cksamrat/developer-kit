const { gitService } = require('../services');
const { refactorPath } = require('../utils');

const clone = async (folderPath, url) => {
  folderPath = refactorPath(folderPath);
  const cloneResult = await gitService.clone(url, folderPath);
  return cloneResult;
};

const getAllBranches = async (folderPath, { remote, currentIndication }) => {
  folderPath = refactorPath(folderPath);
  const branches = await gitService.branch.getAllBranches(folderPath, { remote, currentIndication });
  return branches;
};

const getCurrentBranch = async (folderPath) => {
  folderPath = refactorPath(folderPath);
  const branches = await gitService.branch.getCurrentBranch(folderPath);
  return branches;
};

const createBranch = async (folderPath, branchName) => {
  folderPath = refactorPath(folderPath);
  const branch = await gitService.branch.createBranch(folderPath);
  return branch;
};

module.exports = {
  clone,
  getAllBranches,
  getCurrentBranch,
  createBranch,
};
