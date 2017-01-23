// let Datastore = requireNode('nedb');
let Q = require('q');
let path = require('path');
const nedb = require('nedb');
const remote = require('electron').remote;
const app = remote.app;

var db = new nedb({
    filename: path.join(app.getAppPath(), '/data/capsuleName.db'),
    autoload: true
});

exports.insertdb = (doc) => {
    debugger;
    db.insert(doc, ((err) => {
        console.log(err)
    }), (doc) => {
        console.log(doc);
    });
}

exports.find = (obj) => {
    var deferred = Q.defer();
    db.find(obj, (err, docs) => {
        if (err) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(docs);
        }
    });
    return deferred.promise;
}