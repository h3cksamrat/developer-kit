const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ipc = ipcMain;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 1000,
    minHeight: 700,
    frame: false,
    webPreferences: {
      // can work with nodejs modules
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  
  //Titlebar

  //Minimize Button
  ipc.on('minimizeApp', ()=>{
    mainWindow.minimize();
  })

  //Close Button
  ipc.on('closeApp', ()=>{
    mainWindow.close();
  })

  //Maximize Restore Button
  ipc.on('maximizeRestoreApp', ()=>{
    if(mainWindow.isMaximized()){
      console.log("Restored");
      mainWindow.restore();
    }
    else{
      mainWindow.maximize();
    }
  })

  mainWindow.on('maximize', ()=>{
    mainWindow.webContents.send('isMaximized');
  })

  mainWindow.on('unmaximize', ()=>{
    mainWindow.webContents.send('isRestored');
  })

  //Maximize Button
  ipc.on('maximizeApp', ()=>{
    mainWindow.maximize();
  })


};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
