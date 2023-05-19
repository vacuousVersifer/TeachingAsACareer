const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

class PageHandler {
  constructor() {
    console.log("Page Handler created");

    this.windows = {};
    for(let i = 1; i <= 12; i++) {
      this.windows[`chapter${i}`] = null;
    }
  }

  start() {
    console.log("Page Handler started!");

    app.whenReady().then(() => {
      this.mainWindow = this.createWindow("entrance", 400, 600);

      ipcMain.handle("open", (event, name) => {
        if(!this.isWindowOpened(this.windows[name])) {
          this.windows[name] = this.createWindow(name, 800, 600, this.mainWindow);
        }
      });
    });

    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") app.quit();
    });
  }

  createWindow(name, width, height, top) {
    const preloadPath = path.join(__dirname, name, "preload.js");
    const config = {
      width,
      height,
      show: false,
      webPreferences: {
        preload: preloadPath
      }
    };
    if(top) {
      config.parent = top;
    }
    const window = new BrowserWindow(config);
    window.loadFile(path.join("pages", name, "index.html"));
    window.once("ready-to-show", () => {
      window.show();
    });
    return window;
  }

  isWindowOpened(window) {
    if(window == null) return false;
    if(window.isDestroyed()) return false;
    return window.isFocusable();
  }
}

module.exports = PageHandler;