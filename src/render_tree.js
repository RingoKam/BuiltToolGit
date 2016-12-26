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
    if (filePathObj[index]) {
        let position = tree.findIndex(el => el.text == filePathObj[index]);
        if (position < 0 && index < filePathObj.length) {
            if (filePathObj[index] === "MakingCodeObjectOrientated" || filePathObj[index] === "electron-quick-start") {
                console.log(tree, filePathObj, index, gitFolder);
            }
            const newObj = {
                "text": filePathObj[index],
                "icon": "ti-folder",
                "children": []
            }
            var length = tree.push(newObj);
            position = length - 1;
        }
        if (index < filePathObj.length) {
            index++;
            treeStruct(tree[position].children, filePathObj, index, gitFolder);
        }
    } else if (index === filePathObj.length && gitFolder) {
        const url = gitFolder.config["remote \"origin\""] ? gitFolder.config["remote \"origin\""].url : "Repo is not store on remote"
        tree.push({
            "text": gitFolder.file.name,
            "icon": "icon-112",
            "children": [{
                "text": "URL: " + url,
                "icon": "ti-link"
            }, {
                "text": "Branch: " + gitFolder.repoInfo.branch,
                "icon": "icon-11"
            }]
        });
    }
};

exports.renderJsTree = (selector, gitFolder) => {
    let tree = [];
    for (let i = 0; i < gitFolder.length; i++) {
        let filePathObj = (gitFolder[i].repoInfo.root).split("\\");
        filePathObj.pop();
        treeStruct(tree, filePathObj, 0, gitFolder[i]);
    }
    template.core.data = tree;
    $(selector).jstree(template);
};