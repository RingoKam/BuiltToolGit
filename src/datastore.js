let Datastore = require('nedb'); 
let Q = require('q');
let db = new Datastore({ filename: './data/datafile.db', autoload: true});
 
exports.insertdb = (doc) => {
    db.insert(doc)
}

exports.find = (obj) => {
    // return Q.nfcall(db.find, obj); 
    var deferred = Q.defer();
    db.find(obj, (err, docs) => {
        if(err) {
            deferred.reject(new Error(error)); 
        } else {
            deferred.resolve(docs); 
        }
    });
    return deferred.promise; 
}