const electron = window.require('electron').remote;

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

    model.SaveScriptLocation = function() {
        electron.dialog.showOpenDialog({
            title: "Select output location",
            properties: ["openDirectory"]
        }, (filePath) => {
            this.outputLocation = filePath;
        })
    }
}