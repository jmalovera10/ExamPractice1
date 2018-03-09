

//DB Insertion example
/*
exports.insertWeight = function (db, callback, userId, weight) {
    const dbase = db.db("nutrition"); //here
    // Get the documents collection
    let collection = dbase.collection("weights");
    try {
        collection.find({'userId': userId}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs);
            let weights = [];
            let dates = [];
            if (docs && docs.length > 0) {
                weights = docs[0].weights;
                dates = docs[0].dates;
            }
            let todate = new Date();
            todate = todate / 3600000;
            if (dates && dates.length > 0) {
                let date = dates[dates.length - 1];
                if (todate - date < 20) {
                    weights.pop();
                    weights.push(weight);
                    dates.pop();
                    dates.push(todate);
                }
                else {
                    weights.push(weight);
                    dates.push(todate);
                }
            }
            else {
                weights.push(weight);
                dates.push(todate);
            }
            collection.updateOne({userId: userId}
                , {$set: {weights: weights, dates: dates}}, {upsert: true},
                function (err, result) {
                    assert.equal(err, null);
                    assert.equal(1, result.result.n);
                    console.log("Added weight");
                    callback(result);
                });
        });
    }
    catch (err) {
        dbase.createCollection('weights', {size: 2148});
        collection = dbase.collection('weights');
        console.log(collection);
        collection.updateOne({userId: userId}
            , {$set: {weights: [weight]}}, {upsert: true},
            function (err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                console.log("Added weight");
                callback(result);
            });
    }
};*/