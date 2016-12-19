const electron = require('electron');

electron.app.on('ready', () => {
    let mainWindow = new electron.BrowserWindow({
        height: 600, 
        width: 800
    }).loadURL('file://' + __dirname + '/index.html');
});