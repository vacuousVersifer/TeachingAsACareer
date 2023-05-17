const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

class PageHandler {
  constructor() {
    console.log("Page Handler created");
  }

  start() {
    console.log("Page Handler started!");

    app.whenReady().then(() => {
      const entranceWindow = this.createWindow("entrance", 800, 600);
      ipcMain.handle("ping", () => "pong");
    });

    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") app.quit();
    });
  }

  createWindow(name, width, height) {
    const preloadPath = path.join(__dirname, name, "preload.js");
    const config = {
      width,
      height,
      webPreferences: {
        preload: preloadPath
      }
    };
    const window = new BrowserWindow(config);
    window.loadFile(path.join("pages", name, "index.html"));
  }
}

module.exports = PageHandler;