const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    title:'Flamenco Manager',
    width: 800,
    height: 600,
    darkTheme:true,
    icon: path.join(__dirname, resolveIcons()),
  })

  win.loadFile('./renderer/index.html')
  win.removeMenu();
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
  app.setUserTasks([])
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


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
