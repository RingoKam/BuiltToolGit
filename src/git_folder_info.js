const fs = require('fs');
const path = require('path');
const getRepoInfo = require('git-repo-info');
const parseGit = require('parse-git-config');

let Folders = []; 

function readDirectory(directory, gitFolder) {
    const repoInfo = getRepoInfo(directory); 
    if (repoInfo.sha) {
        const config = parseGit.sync({path: directory + "/.git/config"}); 
        const file = path.parse(directory); 
        gitFolder.push({
            "file": file,
            "repoInfo": repoInfo,
            "config": config
        });
    } else if (fs.lstatSync(directory).isDirectory()) {
        var files = fs.readdirSync(directory);
        for (let i = 0; i < files.length; i++) {
            let fullpath = directory + "/" + files[i];
            readDirectory(fullpath, gitFolder);
        }
    }
};

// function IsGit(fullpath) {
//     if (getRepoInfo(fullpath).sha)
//         return true;
// }

exports.GitFolders = (filePath) => {
    let gitFolder = [];
    readDirectory(filePath, gitFolder);
    Folders = Folders.concat(gitFolder); 
    return Folders;
}