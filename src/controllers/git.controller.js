const { gitService } = require('../services');
const { refactorPath } = require('../utils');

const clone = async (folderPath, url) => {
  folderPath = refactorPath(folderPath);
  const cloneResult = await gitService.clone(url, folderPath);
  return cloneResult;
};

module.exports = {
  clone,
};
