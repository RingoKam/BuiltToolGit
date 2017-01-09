const datastore = require('./datastore'); 

var data = datastore.find({});

data.then((data) => {
    console.log(data); 
})