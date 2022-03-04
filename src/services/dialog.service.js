const { dialog } = require('electron');

const showOpenDialog = async (options, BrowserWindow) => {
  // Ensure the path exists (if provided)
  if (options.defaultPath) {
    const pathExists = await Promises.exists(options.defaultPath);
    if (!pathExists) {
      options.defaultPath = undefined;
    }
  }
  let result;
  if (BrowserWindow) {
    result = await dialog.showOpenDialog(BrowserWindow, options);
  } else {
    result = await dialog.showOpenDialog(options);
  }

  return result;
};

module.exports = {
  showOpenDialog,
};
