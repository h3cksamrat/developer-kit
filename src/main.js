const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { showOpenDialog } = require('./services/dialog.service');
const ipc = ipcMain;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 1000,
    minHeight: 700,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.webContents.openDevTools();

  ipc.on('minimizeApp', () => {
    mainWindow.minimize();
  });

  ipc.on('closeApp', () => {
    mainWindow.close();
  });

  ipc.on('maximizeRestoreApp', () => {
    if (mainWindow.isMaximized()) {
      console.log('Restored');
      mainWindow.restore();
    } else {
      mainWindow.maximize();
    }
  });

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('isMaximized');
  });

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('isRestored');
  });

  ipc.on('maximizeApp', () => {
    mainWindow.maximize();
  });

  ipc.handle('openFolder', async () => {
    return await showOpenDialog({ title: 'Open Git Repo', properties: ['openDirectory', 'createDirectory'] }, mainWindow);
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
