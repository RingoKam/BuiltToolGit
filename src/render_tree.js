require('jstree');

let template = ({
    "core": {
        'data': [],
        "themes": {
            "variant": "large"
        }
    },
    "checkbox": {
        "keep_selected_style": false
    },
    "plugins": ["wholerow", "checkbox"]
});

function treeStruct(tree, filePathObj, index, gitFolder) {
    let position = tree.findIndex(el => el.text == filePathObj[index])
    if (position < 0 && index < filePathObj.length) {
        const newObj = {"text": filePathObj[index], "children": []} 
        tree.push(newObj);
        position = 0;   
    }
    if(index < filePathObj.length){
        index++; 
        treeStruct(tree[position].children, filePathObj, index, gitFolder); 
    } else if(index === filePathObj.length) {
        tree.push({
            "text": gitFolder.file.name, 
            "children": [
                {"text": "URL: " + gitFolder.config["remote \"origin\""].url}, 
                {"text": "Branch: " + gitFolder.repoInfo.branch}
            ]
        });
    }
};

exports.renderJsTree = (selector, gitFolder) => {
    let tree = [];
    for (let i = 0; i < gitFolder.length; i++) {
        const filePathObj = (gitFolder[i].repoInfo.root).split("\\");
        filePathObj.pop(); 
        treeStruct(tree, filePathObj, 0, gitFolder[i]);
    }
    template.core.data = tree; 
    $(selector).jstree(template); 
};