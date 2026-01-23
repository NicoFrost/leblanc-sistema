"use strict";
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { User } = require("./db");
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });
  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
};
app.whenReady().then(() => {
  createWindow();
  registerUsersIpc(ipcMain);
  registerEmployeeIpc(ipcMain);
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
