const fs = require('fs');
const path = require('path');
const getRepoInfo = require('git-repo-info');

function readDirectory(directory, gitFolder) {
    const isDirectory = fs.lstatSync(directory).isDirectory();
    if (isDirectory) {
        var files = fs.readdirSync(directory);
        for (let i = 0; i < files.length; i++) {
            let fullpath = directory + "/" + files[i];
            if (IsGit(fullpath)) {
                let repoInfo = getRepoInfo(fullpath);
                gitFolder.push({
                    "file": files[i],
                    "repoInfo": repoInfo
                });
            } else {
                readDirectory(fullpath, gitFolder);
            }
        }
    }
};

function IsGit(fullpath) {
    if (getRepoInfo(fullpath).sha)
        return true;
}

exports.GitFolders = (filePath) => {
    let gitFolder = [];
    readDirectory(filePath, gitFolder);
    return gitFolder;
} 