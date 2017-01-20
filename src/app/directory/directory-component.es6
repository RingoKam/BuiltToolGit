import controller from "./directory-controller"

export default {
    binding: {
        SelectedGitFolders: "<"
        // ChangeSelectedGitFolders: "&"
    },
    template: require("./directory.html"),
    controller: "directoryController",
    controllerAs: "model"
}