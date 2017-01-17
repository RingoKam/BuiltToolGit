const fs = require('fs');
const Q = require('q');

function Writewithbreaktag(string) {
    return string + "\n";
};

function InitializeLocalVariable(root) {
    let text = "";
    text += Writewithbreaktag("username=\"USER INPUT\"");
    text += Writewithbreaktag("root=\"" + root.replace(/\W/g, '') + "\"");
    return text;
}

function CreateGitCapsuleLogo() {
    let text = "";
    text += Writewithbreaktag("echo '**************************************************************************************************' ");
    text += Writewithbreaktag("echo '  /$$$$$$  /$$$$$$ /$$$$$$$$  /$$$$$$   /$$$$$$  /$$$$$$$   /$$$$$$  /$$   /$$ /$$       /$$$$$$$$' ")
    text += Writewithbreaktag("echo ' /$$__  $$|_  $$_/|__  $$__/ /$$__  $$ /$$__  $$| $$__  $$ /$$__  $$| $$  | $$| $$      | $$_____/' ")
    text += Writewithbreaktag("echo '| $$  \\__/  | $$     | $$   | $$  \\__/| $$  \\ $$| $$  \\ $$| $$  \\__/| $$  | $$| $$      | $$      ' ")
    text += Writewithbreaktag("echo '| $$ /$$$$  | $$     | $$   | $$      | $$$$$$$$| $$$$$$$/|  $$$$$$ | $$  | $$| $$      | $$$$$   ' ")
    text += Writewithbreaktag("echo '| $$|_  $$  | $$     | $$   | $$      | $$__  $$| $$____/  \\____  $$| $$  | $$| $$      | $$__/   ' ")
    text += Writewithbreaktag("echo '| $$  \\ $$  | $$     | $$   | $$    $$| $$  | $$| $$       /$$  \\ $$| $$  | $$| $$      | $$      ' ")
    text += Writewithbreaktag("echo '|  $$$$$$/ /$$$$$$   | $$   |  $$$$$$/| $$  | $$| $$      |  $$$$$$/|  $$$$$$/| $$$$$$$$| $$$$$$$$' ")
    text += Writewithbreaktag("echo '\\______/ |______/   |__/    \\______/ |__/  |__/|__/       \\______/  \\______/ |________/|________/ ' ")
    text += Writewithbreaktag("echo '**************************************************************************************************' ")
    return text;
}

function CreateComment(comment) {
    let text = "";
    let commentsArray = comment.match(new RegExp('.{1,' + 99 + '}', 'g'));
    text += Writewithbreaktag("echo '##NOTE#############################################################################################'");
    for (var index in commentsArray) {
        text += Writewithbreaktag("echo " + commentsArray[index]);
    }
    text += Writewithbreaktag("echo '###################################################################################################'");
    return text;
}

//amtrust version
function CreatePullCodeFunction() {
    let text = ""
    text += Writewithbreaktag("function PullCode()");
    text += Writewithbreaktag("{")
    text += Writewithbreaktag("local url=$1"); //project location 
    text += Writewithbreaktag("local fulldir=$2"); //the project folder 
    text += Writewithbreaktag("local project=$3"); //project name 
    text += Writewithbreaktag("local sha=$4"); //sha for checkout
    text += Writewithbreaktag("echo -- $project \"-------------------------------------------------------- \"");
    text += Writewithbreaktag("mkdir -p /$root/$fulldir/$project");
    text += Writewithbreaktag("echo \"-- CHANGING DIRECTORY --\"");
    text += Writewithbreaktag("cd /$root/$fulldir/$project");
    text += Writewithbreaktag("echo \"current working directory:\" $PWD");
    text += Writewithbreaktag("git clone $url");
    text += Writewithbreaktag("echo");
    text += Writewithbreaktag("echo \"-- RESETTING --\"");
    text += Writewithbreaktag("git reset --hard");
    text += Writewithbreaktag("echo");
    text += Writewithbreaktag("echo \"-- FETCHING -- \"");
    text += Writewithbreaktag("git fetch");
    text += Writewithbreaktag("echo");
    text += Writewithbreaktag("echo \" -- CHECKING OUT BRANCH --\"");
    text += Writewithbreaktag("git checkout $sha");
    text += Writewithbreaktag("echo");
    text += Writewithbreaktag("}")
    return text;
}

function PullCode(selectedGitFolders) {
    let text = "";
    for (let i in selectedGitFolders) {
        let dir = ParseDirectory(selectedGitFolders[i].file.dir);
        text += Writewithbreaktag("PullCode \"$username@sourcecontrol.amtrustservices.com:" + selectedGitFolders[i].config["remote \"origin\""].url.split(":").pop() + "\" " + "\"" + dir + "\" " + "\"" + selectedGitFolders[i].file.base + "\" " + "\"" + selectedGitFolders[i].repoInfo.sha + "\"");
    }
    return text;
}

function ParseDirectory(directory) {
    let array = directory.split("\\");
    let dir = "";
    for (let i = 1; i < array.length; i++) {
        dir += array[i]
        if (i != array.length - 1)
            dir += "/";
    }
    return dir;
}

function GetProject(projects) {
    let text = Writewithbreaktag("echo \"Following Git Repository will be created/updated in your root directory\"");
    for (let i in projects) {
        text += Writewithbreaktag("echo \"" + projects[i] + "\"");
    }
    text += Writewithbreaktag("read -p \"Press enter to continue...\"");
    return text;
}

function GetUsername() {
    let text = "";
    text += Writewithbreaktag("echo")
    text += Writewithbreaktag("read -p \"Enter your GIT username, then click enter: \" username")
    return text;
}

exports.createScript = (directory, selectedGitFolders, name, comment) => {
    try {
        let codeFile = CreateGitCapsuleLogo();
        //assuming root is same for now.. 
        codeFile += InitializeLocalVariable(selectedGitFolders[0].file.root);
        codeFile += CreatePullCodeFunction();
        if (comment) {
            codeFile += CreateComment(comment);
        }
        codeFile += GetProject(selectedGitFolders.map((e) => {
            return e.file.name
        }));
        codeFile += GetUsername();
        codeFile += PullCode(selectedGitFolders);
        const fileName = directory + "\\" + name + ".sh";
        const writer = fs.createWriteStream(fileName);
        writer.write(codeFile);
        writer.end("read -p \"Press enter to exit :)\"");
        writer.on('finish', () => {
            $.notify({
                icon: 'glyphicon icon-062',
                title: 'File Created',
                message: name + " created (" + directory + ")"
            }, {
                type: 'success'
            })
        });
    } catch (error) {
        $.notify({
            icon: 'glyphicon glyphicon-warning-sign',
            title: 'Error!',
            message: "Error! Please report error on GitHub. " + error
        }, {
            type: 'warning'
        })
    }
}