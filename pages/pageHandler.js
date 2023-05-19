const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

class PageHandler {
  constructor() {
    console.log("Page Handler created");
    this.openWindows = {
      chapter1: false,
      chapter2: false,
      chapter3: false,
      chapter4: false,
      chapter5: false,
      chapter6: false,
      chapter7: false,
      chapter8: false,
      chapter9: false,
      chapter10: false,
      chapter11: false,
      chapter12: false,
    };
  }

  start() {
    console.log("Page Handler started!");

    app.whenReady().then(() => {
      this.createWindow("entrance", 400, 600);
      ipcMain.handle("open", (event, name) => {
        if(this.openWindows[name]) {
          return console.log("Already opened", name);
        }
        console.log("Opening", name);
        this.openWindows[name] = true;
        this.createWindow(name, 800, 600);
      });
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