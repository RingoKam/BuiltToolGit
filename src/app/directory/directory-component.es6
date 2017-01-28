export default {
    binding: {
        capsuleid: "<",
        selectedGitFolders: "<"
    },
    template: require("./directory.html"),
    controller: directoryController,
    controllerAs: "model"
}

directoryController.$inject = []; 

function directoryController() {
    var model = this;

    model.$onInit = function() {{
        // model.selectedGitFolders = [];
    }}

    model.updateGitFolders = (folders) => {
        model.selectedGitFolders = folders; 
    }
}