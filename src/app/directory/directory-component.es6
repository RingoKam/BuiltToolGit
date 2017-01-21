export default {
    binding: {
        CapsuleId: "<"
    },
    template: require("./directory.html"),
    controller: directoryController,
    controllerAs: "model"
}

directoryController.$inject = []; 

function directoryController() {
    var model = this;

    model.$onInit = function() {{
        model.selectedGitFolders = ["q23"]; 
    }}

    model.updateGitFolders = (folders) => {
        model.selectedGitFolders = folders; 
    } 
}