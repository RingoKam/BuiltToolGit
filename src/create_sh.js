const fs = require('fs'); 

exports.createScript = (directory, selectedGitFolders) => {
    const fileName = directory + "\\HelloWorld";  
    const writer = fs.createWriteStream(fileName); 
    writer.write("Hello World!\n");
    writer.end();  
}