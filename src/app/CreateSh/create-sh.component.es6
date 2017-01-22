const electron = window.require('electron').remote;
const createSh = require('../library/create_sh')
const fs = require('fs');
const notifier = require('electron-notifications')

export default {
    template: require("./create-sh.html"),
    //templateUrl: 'templateUrl',
    controller: createShController,
    controllerAs: "model",
    bindings: {
        gitFolders: '<',
    }
}

// createShController.inject = ['dependency1'];

function createShController() {
    var model = this;
    model.onInit = function () {};
    model.onChanges = function (changesObj) {};
    model.onDestory = function () {};
    model.SaveScriptLocation = function () {
        electron.dialog.showOpenDialog({
            title: "Select output location",
            properties: ["openDirectory"]
        }, (filePath) => {
            this.outputLocation = filePath;
        })
    }

    model.exportSh = function () {
        debugger;
        let {
            fileName,
            codeFile
        } = createSh.createScript(model.outputLocation, model.gitFolders, model.name, model.comment);
        const writer = fs.createWriteStream(fileName);
        writer.write(codeFile);
        writer.end("read -p \"Press enter to exit :)\"");
        writer.on('finish', () => {
            notifier.notify('Success', {
                 message: `${model.name} created in ${model.outputLocation}`,
                 duration: 10000
            })
        });
    }
}
