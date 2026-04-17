const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater,AppUpdater} = require('electron-updater');
const path = require('path');

const { createSeed } = require('../seed');
const { initDB } = require('../db');

const { registerEmployeeIpc } = require('../employee');
const { registerUsersIpc } = require('../users');
const { registerContractIpc } = require('../contract');
const { registerBuildingIpc } = require('../building');
const { registerExpenseIpc } = require('../expense');
const { registerInvoiceIpc } = require('../invoice');
const { registerCollectionIpc } = require('../collection');
const { registerMethodIpc } = require('../method');
const { registerSalaryIpc } = require('../salary');
const { registerPaymentIpc } = require('../payment');

let win;

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

async function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      // preload: path.join(__dirname, 'preload.js'),
    },
  });
  
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('__dirname:', __dirname);
  console.log('preload:', __dirname, '../preload/index.js');

    win.showMessage = function(message) {
    console.log("showMessage trapped");
    console.log("Line 27: ",message);
    win.webContents.send("updateMessage", message);
  }
  
  win.once("ready-to-show", () => {
    win.show();
  });

  // ! Remover esta línea en producción 
  win.webContents.openDevTools({ mode: "undocked" });

  if (process.env.NODE_ENV === 'development') {
    console.log('Loading from localhost:5173 (DEVELOPMENT MODE)');
    win.loadURL('http://localhost:5173');
  } else {
    // Detecta si está ejecutando desde src o desde out/main
    let indexPath;
    if (__dirname.includes('out')) {
      // Ejecutando desde out/main → ir a out/renderer/index.html
      indexPath = path.join(__dirname, '../renderer/index.html');
    } else if (__dirname.includes('src')) {
      // Ejecutando desde src → ir a src/renderer/index.html
      indexPath = path.join(__dirname, '../renderer/index.html');
    } else {
      // Fallback
      indexPath = path.join(__dirname, '../renderer/index.html');
    }
    console.log('Loading index.html from (PRODUCTION MODE):', indexPath);
    win.loadFile(indexPath);

    // Limpiar listeners cuando la ventana se cierra
    win.on('closed', () => {
      ipcMain.removeAllListeners();
      win = null;
    })
  }
}

app.whenReady().then(async () => {
  try {
    console.log('🚀 App starting...');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    
    db = await initDB(); // Inicializar la base de datos
    console.log('✅ Database initialized');

    // Rpegistrar los manejadores IPC después de inicializar la base de datos
    registerUsersIpc(ipcMain, db.User);
    registerEmployeeIpc(ipcMain, db.Employee);
    registerContractIpc(ipcMain, db.Contract);
    registerBuildingIpc(ipcMain, db.Building);
    registerExpenseIpc(ipcMain, db.Expense);
    registerInvoiceIpc(ipcMain,db.Invoice);
    registerCollectionIpc(ipcMain,db.Collection, db.Method);
    registerMethodIpc(ipcMain,db.Method);
    registerSalaryIpc(ipcMain, db.Salary);
    registerPaymentIpc(ipcMain, db.Payment, db.Method);
    console.log('✅ IPC handlers registered');
    
    // Crear datos de ejemplo
    await createSeed(db);
    // console.log('✅ Seed data created');
    
    // Crear la ventana principal
    createWindow();

    // Configurar autoUpdater después de que la ventana esté lista
    win.webContents.once('did-finish-load', () => {
      autoUpdater.checkForUpdates(); // inicia el proceso de actualización
      win.showMessage(`Checking for updates. Current version ${app.getVersion()}`);
      console.log('✅ Window loaded, checking for updates');
    });
    console.log('✅ Window created');
  } catch (error) {
    console.error('❌ Error initializing app:', error);
    console.error(error.stack);
    app.quit();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (win === null) createWindow();
});

// Eventos del autoUpdater
autoUpdater.on('checking-for-update', () => {
  console.log('Paso 1: Checking for updates...');
  if (win) {
    win.webContents.send('updateMessage', 'Buscando actualización...');
  }
});

autoUpdater.on('update-available', () => {
  if (win) {
    win.webContents.send('updateMessage', 'Nueva actualización disponible. Descargando...');
    let pth = autoUpdater.downloadUpdate();
    win.showMessage(pth);
  }
});

autoUpdater.on('update-not-available', () => {
  if (win) {
    win.webContents.send('updateMessage', 'No hay actualizaciones disponibles.');
  }
});

autoUpdater.on('update-downloaded', () => {
  if (win) {
    win.webContents.send('updateMessage', 'Actualización descargada. Reinicia para instalar.');
  }
});

autoUpdater.on('update-cancelled' , () => {
  if (win) {
    win.webContents.send('updateMessage', 'Actualización cancelada.');
  }
});

autoUpdater.on('error', (err) => {
  if (win) {
    win.webContents.send('updateMessage', `Error en actualización: ${err.message}`);
  }
});

autoUpdater.on('download-progress', (progressObj) => {
  if (win) {
    let log_message = `Descargando: ${Math.round(progressObj.percent)}% (${progressObj.transferred}/${progressObj.total} bytes)`;
    win.webContents.send('updateMessage', log_message);
  }
});

// Canal IPC para reiniciar la app
ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});