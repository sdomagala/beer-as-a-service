const express = require('express');
const fs = require('fs');
const mongoHelper = require('./helpers/db.js');
const bodyParser = require('body-parser');
const app = express();

app.post('/', bodyParser.json(), (req, res) => {

  const beer = req.body;

  mongoHelper.insertDocument(beer, (err, data) => {
    res.send(data);
  });
});

app.get('/', (req, res) => {
  mongoHelper.getDocuments({}, (err, beers) => {
    res.send(beers);
  });
});

app.get('/:name', (req, res) => {
  mongoHelper.getDocuments(req.params, (err, beers) => {
    if(err || !beers.length) return res.status(404).json('There is no such beer');

    res.send(`This beer costs ${beers[0].price}`);
  });
});

mongoHelper.startDb('mongodb://localhost:27017/myproject', (err) => {
  if(err) throw new Error(err);
  app.listen(3000, () => {
    console.log('Server started at port 3000');
  });
});
