'use strict';
const MongoClient = require('mongodb').MongoClient;

let mongoCollection;

function startDb(url, cb) {
  MongoClient.connect(url, (err, db) => {

    if(err) return cb(err);

    mongoCollection = db.collection('beers');
    console.log("Connected correctly to server");
    cb();
  });
}

function insertDocument(obj, callback) {
  mongoCollection.insert(obj, callback);
}

function getDocuments(obj, callback) {
  mongoCollection.find(obj).toArray(callback);
}

module.exports = {
  startDb,
  insertDocument,
  getDocuments
};
