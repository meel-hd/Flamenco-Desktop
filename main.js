const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
var child = require("child_process").execFile;

// Create the main window
function createWindow() {
  const win = new BrowserWindow({
    title: "Flamenco Manager",
    width: 800,
    height: 600,
    darkTheme: true,
    icon: path.join(__dirname, resolveIcons()),
    webPreferences: {
      preload: path.join(__dirname, "renderer/preload.js"),
    },
  });

  win.loadFile("./renderer/index.html");
  win.removeMenu();
  // Listen for the invoke of Flamenco manager executable
  ipcMain.handle("launchManager", () => {
    startFlamencoExec();
    win.webContents.send("startClient");
    win.maximize()
  });

  // Handels The Swagger UI and open it in a new window
  win.on("page-title-updated", (e, title) => {
    if (title == "Swagger UI") {
      win.loadURL("http://127.0.0.1:8080/");
      const newWin = new BrowserWindow({
        title: "Flamenco Manager",
        width: 800,
        height: 600,
        darkTheme: true,
        icon: path.join(__dirname, resolveIcons()),
      });
      newWin.loadURL("http://127.0.0.1:8080/api/v3/swagger-ui/");
      newWin.maximize();
      newWin.removeMenu();
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  app.setUserTasks([]);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Execute the flamenco-manager.exe
function startFlamencoExec() {
  const executablePath = path.join(__dirname, "exec/flamenco-manager.exe");
  child(executablePath, function (err, data) {
    if (err) {
      console.error(err);
      return;
    }

    console.log(data.toString());
  });
}

// Figure the icons dynamicly based on the platform
function resolveIcons() {
  let iconPath = "";
  if (process.platform === "darwin") {
    iconPath = "assets/icons/mac/logo.icns";
  } else if (process.platform === "win32") {
    iconPath = "assets/icons/win/logo.ico";
  } else {
    iconPath = "assets/icons/png/logo.png";
  }
  console.log(`On platform ${process.platform}`);
  console.log(`Icon: ${path.join(__dirname, iconPath)}`);
  return iconPath;
}
