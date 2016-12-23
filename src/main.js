//The process that runs package.json’s main script is called the main process. 
//The script that runs in the main process can display a GUI by creating web pages.
const electron = require('electron');
const gitFolderInfo = require('./git_folder_info');

electron.app.on('ready', () => {
    let mainWindow = new electron.BrowserWindow({
        height: 600,
        width: 800
    })

    mainWindow.loadURL('file://' + __dirname + '/template.html');
   
    menuTemplate = [{
        label: "File",
        submenu: [{
            label: 'open',
            click: () => {
                electron.dialog.showOpenDialog({
                    title: "Select a folder",
                    properties: ["openDirectory"]
                },  (filePath) => {
                    console.log(filePath);
                    let gitFolder = gitFolderInfo.GitFolders(filePath[0]);
                    console.log(gitFolder);
                });
            }
        }]
    }];

    let menu = electron.Menu.buildFromTemplate(menuTemplate)

     menu.append(new electron.MenuItem({
        role: "reload"
    }));

    //Dev Tools--- 
    menu.append(new electron.MenuItem({
        role: "toggledevtools"
    }));

    electron.Menu.setApplicationMenu(menu);
});