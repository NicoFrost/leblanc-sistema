"use strict";
const { contextBridge, ipcRenderer } = require("electron");
console.log('preload loaded'); // <-- debe verse en DevTools (main window)
contextBridge.exposeInMainWorld('api', {
  // Update IPCs
  updateMessage: (callback) => ipcRenderer.on("updateMessage", callback),
  // User IPCs
  getUsers: () => ipcRenderer.invoke('get-users'),
  addUser: (user) => ipcRenderer.invoke('add-user', user),
  deleteUser: (id) => ipcRenderer.invoke('delete-user', id),
  // Employee IPCs
  getEmployees: () => ipcRenderer.invoke('employee:get'),
  createEmployee: (employee) => ipcRenderer.invoke('employee:create', employee),
  updateEmployee: (id, employee) => ipcRenderer.invoke('employee:update', id, employee),
  deleteEmployee: (id) => ipcRenderer.invoke('employee:delete', id),  

  // Building IPCs
  getBuildings: () => ipcRenderer.invoke('building:get'),
  createBuilding: (building) => ipcRenderer.invoke('building:create', building),
  updateBuilding: (id, building) => ipcRenderer.invoke('building:update', id, building),
  deleteBuilding: (id) => ipcRenderer.invoke('building:delete', id),

  // Contract IPCs
  getContracts: () => ipcRenderer.invoke('contract:get'),
  createContract: (contract) => ipcRenderer.invoke('contract:create', contract),
  updateContract: (id, contract) => ipcRenderer.invoke('contract:update', id, contract),
  deleteContract: (id) => ipcRenderer.invoke('contract:delete', id),

  // Expense IPCs
  getExpenses: () => ipcRenderer.invoke('expense:get'),
  createExpense: (expense) => ipcRenderer.invoke('expense:create', expense),
  updateExpense: (id, expense) => ipcRenderer.invoke('expense:update', id, expense),
  deleteExpense: (id) => ipcRenderer.invoke('expense:delete', id),

  // Invoice IPCs
  getInvoices: () => ipcRenderer.invoke('invoice:get'),
  createInvoice: (invoice) => ipcRenderer.invoke('invoice:create', invoice),
  updateInvoice: (id, invoice) => ipcRenderer.invoke('invoice:update', id, invoice),
  deleteInvoice: (id) => ipcRenderer.invoke('invoice:delete', id),

  // Collection IPCs
  getCollections: () => ipcRenderer.invoke('collection:get'),
  createCollection: (collection) => ipcRenderer.invoke('collection:create', collection),
  updateCollection: (id, collection) => ipcRenderer.invoke('collection:update', id, collection),
  deleteCollection: (id) => ipcRenderer.invoke('collection:delete', id),

  // Method IPCs
  getMethod: () => ipcRenderer.invoke('method:get'),
  createMethod: (method) => ipcRenderer.invoke('method:create', method),
  updateMethod: (id, method) => ipcRenderer.invoke('method:update', id, method),
  deleteMethod: (id) => ipcRenderer.invoke('method:delete', id),

  // Salary IPCs
  getSalaries: () => ipcRenderer.invoke('salary:get'),
  createSalary: (salary) => ipcRenderer.invoke('salary:create', salary),
  updateSalary: (id, salary) => ipcRenderer.invoke('salary:update', id, salary),
  deleteSalary: (id) => ipcRenderer.invoke('salary:delete', id),

  // Payment IPCs
  getPayments: () => ipcRenderer.invoke('payment:get'),
  createPayment: (payment) => ipcRenderer.invoke('payment:create', payment),
  updatePayment: (id, payment) => ipcRenderer.invoke('payment:update', id, payment),
  deletePayment: (id) => ipcRenderer.invoke('payment:delete', id),
});