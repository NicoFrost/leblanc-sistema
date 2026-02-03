const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const { createSeed } = require('./seed');
const { initDB } = require('./db');

const { registerEmployeeIpc } = require('./employee');
const { registerUsersIpc } = require('./users');
const { registerContractIpc } = require('./contract');
const { registerBuildingIpc } = require('./building');
const { registerExpenseIpc } = require('./expense');
const { registerInvoiceIpc } = require('./invoice');
const { registerCollectionIpc } = require('./collection');
const { registerMethodIpc } = require('./method');
const { registerSalaryIpc } = require('./salary');
const { registerPaymentIpc } = require('./payment');
const { log } = require('console');


let win;

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, './preload/index.js'),
    },
  });
  
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(async () => {
  try {
    db = await initDB(); // Inicializar la base de datos

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
    // Crear datos de ejemplo
    await createSeed(db);
    // Crear la ventana principal
    await createWindow();
  } catch (error) {
    console.error('Error initializing app:', error);
    app.quit();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
