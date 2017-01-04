const fs = require('fs');

function Writewithbreaktag(string) {
    return string + "\n";
};

function InitializeLocalVariable(){
    let text = "";
    text += Writewithbreaktag(username="USER INPUT") 
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
    let text = "";
    text += Writewithbreaktag("function PullCode()");
    text += Writewithbreaktag("{")
    text += Writewithbreaktag("local url=$1"); //project location 
    text += Writewithbreaktag("local fulldir=$2"); //the project folder 
    text += Writewithbreaktag("local project=$3"); //project name 
    text += Writewithbreaktag("local sha=$4"); //sha for checkout
    text += Writewithbreaktag("if [ ! -d $fulldir ]; then");
    text += Writewithbreaktag("echo \"Git Repo Exist\"");
    text += Writewithbreaktag("else");
    text += Writewithbreaktag("echo \"Git Repo doesnt exist, will create\"");
    text += Writewithbreaktag("git clone $url");
    text += Writewithbreaktag("mkdir $fulldir/$project");
    text += Writewithbreaktag("fi");
    text += Writewithbreaktag("echo");
    text += Writewithbreaktag("echo \"-- CHANGING DIRECTORY --\"");
    text += Writewithbreaktag("cd $fulldir/$project");
    text += Writewithbreaktag("echo");
    text += Writewithbreaktag("echo \"-- RESETTING --\"");
    text += Writewithbreaktag("git reset --hard");
    text += Writewithbreaktag("echo");
    text += Writewithbreaktag("echo \"-- FETCHING -- \"");
    text += Writewithbreaktag("git fetch");
    text += Writewithbreaktag("echo");
    text += Writewithbreaktag("echo \" -- CHECKING OUT BRANCH --\"");
    text += Writewithbreaktag("git checkout $branch");
    text += Writewithbreaktag("}")
    return text;
}

function PullCode(selectedGitFolders) {
    let text = "";
    for (let i in selectedGitFolders) {
        let dir = ParseDirectory(selectedGitFolders[i].file.dir); 
        text += Writewithbreaktag("PullCode \"$username@sourcecontrol.amtrustservices.com:" +  selectedGitFolders[i].config["remote \"origin\""].url.split(":").pop() + "\" " + "\"" + dir + "\" " +  "\"" + selectedGitFolders[i].file.base + "\" " + "\"" + selectedGitFolders[i].repoInfo.sha + "\"");  
    }
    return text; 
}

function ParseDirectory(directory) {
    let array = directory.split("\\");
    let dir = "/";
    for (let i = 1; i < array.length; i++) {
        dir += array[i] + "/";
    }
    return dir; 
}

function GetUsername(){
    let text = ""; 
    text += Writewithbreaktag("echo")
    text += Writewithbreaktag("read -p \"Enter your GIT username, then click enter: \" username") 
}

exports.createScript = (directory, selectedGitFolders, name, comment) => {
    let codeFile = CreateGitCapsuleLogo();
    codeFile += InitializeLocalVariable(); 
    codeFile += CreatePullCodeFunction();
    if (comment) {
        codeFile += CreateComment(comment);
    }
    codeFile += GetUsername(); 
    codeFile += PullCode(selectedGitFolders); 
    const fileName = directory + "\\" + name + ".sh";
    const writer = fs.createWriteStream(fileName);
    writer.write(codeFile);
    writer.end("read -p \"$*\"");
}