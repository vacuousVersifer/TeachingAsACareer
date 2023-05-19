const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

class PageHandler {
  constructor() {
    console.log("Page Handler created");

    this.windows = {};
    for(let i = 1; i <= 12; i++) {
      let template = {
        opened: false,
        window: null
      };
      this.windows[`chapter${i}`] = template;
    }
  }

  start() {
    console.log("Page Handler started!");

    app.whenReady().then(() => {
      this.createWindow("entrance", 400, 600);
      ipcMain.handle("open", (event, name) => {
        let window = this.windows[name];
        
        if(window.opened || !this.isWindowOpened(window.window)) {
          window.opened = true;
          window.window = this.createWindow(name, 800, 600);
        }
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
      show: false,
      webPreferences: {
        preload: preloadPath
      }
    };
    const window = new BrowserWindow(config);
    window.loadFile(path.join("pages", name, "index.html"));
    window.once("ready-to-show", () => {
      window.show();
    });
    return window;
  }

  isWindowOpened(window) {
    if(window == null) return false;
    return !window.isDestroyed();
  }
}

module.exports = PageHandler;