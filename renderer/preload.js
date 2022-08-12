const {contextBridge, ipcRenderer} = require('electron');

// Expose function that well run the manager
contextBridge.exposeInMainWorld('launchManager',()=> ipcRenderer.invoke('launchManager'));

// Wait until the Flamenco manager is running and redirect
ipcRenderer.on('startClient',() =>{
    window.location.href = 'http://127.0.0.1:8080/'
})