const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { User } = require('./db');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload/index.js")
    },
  });

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, './renderer/index.html'));
  }
}

app.whenReady().then(createWindow);

ipcMain.handle('get-users', async () => {
  const users = await User.findAll();
  return users;
});

ipcMain.handle('add-user', async (event, userData) => {
  const newUser = await User.create(userData);
  return newUser;
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
