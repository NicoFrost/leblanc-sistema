const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // User IPCs
  getUsers: () => ipcRenderer.invoke('get-users'),
  addUser: (user) => ipcRenderer.invoke('add-user', user),
  deleteUser: (id) => ipcRenderer.invoke('delete-user', id),

  // Employee IPCs
  getEmployees: () => ipcRenderer.invoke('employee:get'),
  createEmployee: (employee) => ipcRenderer.invoke('employee:create', employee),
  updateEmployee: (id, employee) => ipcRenderer.invoke('employee:update', id, employee),
  deleteEmployee: (id) => ipcRenderer.invoke('employee:delete', id),

  
});
