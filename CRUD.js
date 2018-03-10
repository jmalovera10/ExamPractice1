const assert = require('assert');

//CRUD method that inserts and updates the search frequency
exports.insertSearch = (db, callback, search)=>{
    const dbm = db.db("historic_searches");
    let collection = dbm.collection("searches");
    try{
        collection.find({'search':search}).toArray((err,docs)=> {
            assert.equal(err,null);
            console.log("Found the following records");
            console.log(docs);
            let count = null;
            if(docs && docs.length>0){
                count = docs[0].count;
            }
            count++;
            collection.updateOne({search: search}
                , {$set: {count:count}}, {upsert: true},
                function (err, result) {
                    assert.equal(err, null);
                    assert.equal(1, result.result.n);
                    console.log("Search count up");
                    callback(result);
                });
        });
    }
    catch(err){
        dbase.createCollection('searches', {size: 2148});
        collection = dbase.collection('searches');
        console.log(collection);
        collection.updateOne({search: search}
            , {$set: {count:1}}, {upsert: true},
            function (err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                console.log("Search count up");
                callback(result);
            });
    }
}

//CRUD method that returns the most frequent searches
exports.getFrequentSearches = (db, callback, search)=>{

}