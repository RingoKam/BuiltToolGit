let Datastore = require('nedb'); 
let Q = require('q');
let db = new Datastore({ filename: './data/datafile.db', autoload: true});
 
exports.insertdb = (doc) => {
    db.insert(doc)
}

exports.find = (obj) => {
    return Q.nfcall(db.find, obj); 
    //return db.find(true, obj); 
}