const { gitService } = require('../services');

const clone = async (folderPath, url) => {
  const cloneResult = await gitService.clone(url, folderPath);
  return cloneResult;
};

module.exports = {
  clone,
};
