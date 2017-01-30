const electron = window.require('electron').remote;
const createSh = require('../library/create_sh');
const fs = require('fs');
const notifier = require('electron-notifications');
const dataStore = require('../library/datastore');
const moment = require('moment');
const capsuleNameStore = require('../library/capsule_name_store');

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
function createShController($rootScope) {
    var model = this;

    model.$onInit = function () {
        capsuleNameStore.find({}).then((data) => {
            model.capsuleNames = data.map(m => m.name);
        });
    };
    model.$onChanges = function (changesObj) {
        if (this.gitFolders.gitFiles)
            model.gitFolders = this.gitFolders.gitFiles;
    };
    model.$onDestory = function () {};

    model.SaveScriptLocation = function () {
        electron.dialog.showOpenDialog({
            title: "Select output location",
            properties: ["openDirectory"]
        }, (filePath) => {
            this.outputLocation = filePath;
        })
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
                capsule: model.capsuleName ? model.capsuleName : "Other",
                name: model.name,
                gitFiles: model.gitFolders,
                comment: model.comment,
                createdOn: moment().format('MMMM Do YYYY, h:mm:ss a')
            }
            dataStore.insertdb(record);
            let myNotification = new Notification('Success!', {
                body: `${model.name} created in ${model.outputLocation}`
            });
            // notifier.notify('Success', {
            //     message: `${model.name} created in ${model.outputLocation}`,
            //     duration: 10000
            // })
            $rootScope.$emit("refreshData");
        });
    }
}