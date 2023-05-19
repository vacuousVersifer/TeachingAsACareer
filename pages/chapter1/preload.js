const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("pageHandler", {
  open: name => ipcRenderer.invoke("open", name),
  // we can also expose variables, not just functions
});