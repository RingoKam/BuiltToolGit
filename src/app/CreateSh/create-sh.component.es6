const electron = window.require('electron').remote;
const createSh = require('../library/create_sh');
const fs = require('fs');
const notifier = require('electron-notifications');
const dataStore = require('../library/datastore');
const moment = require('moment');
const capsuleNameStore = require('../library/capsuleNameStore');

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
    model.onInit = function () {
        model.capsuleNames = capsuleNameStore.find({});
    };
    model.$onChanges = function (changesObj) {};
    model.onDestory = function () {};
    model.SaveScriptLocation = function () {
        electron.dialog.showOpenDialog({
            title: "Select output location",
            properties: ["openDirectory"]
        }, (filePath) => {
            this.outputLocation = filePath;
        })
    }

    model.addNewCapsuleName = function () {
        debugger;
        console.log("this happened")
    }

    model.exportSh = function () {

        model.gitFolders = model.gitFolders.map((el) => {
            delete el['$$hashKey'];
            return el;
        });
        let {
            fileName,
            codeFile
        } = createSh.createScript(model.outputLocation, model.gitFolders, model.name, model.comment);
        const writer = fs.createWriteStream(fileName);
        writer.write(codeFile);
        writer.end("read -p \"Press enter to exit :)\"");
        writer.on('finish', () => {
            let record = {
                capsule: model.capsuleName,
                name: model.name,
                gitFiles: model.gitFolders,
                comment: model.comment,
                createdOn: moment().format('MMMM Do YYYY, h:mm:ss a')
            }
            dataStore.insertdb(record);
            notifier.notify('Success', {
                message: `${model.name} created in ${model.outputLocation}`,
                duration: 10000
            })
        });
    }
}