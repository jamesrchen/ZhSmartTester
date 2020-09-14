var express = require('express');
var router = express.Router();

var fetch = require("node-fetch")
var csv = require("csv-parser")
var path = require('path');
var fs = require("fs")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('This is the API Endpoint');
});

router.get('/pinyin', function(req, res, next) {
  if(!req.query.word){
    res.sendStatus(400)
  }else{
    console.log(`https://glosbe.com/transliteration/api?from=Han&dest=Latin&text=${encodeURI(req.query.word)}&format=json`)
    fetch(`https://glosbe.com/transliteration/api?from=Han&dest=Latin&text=${encodeURI(req.query.word)}&format=json`).then(r => {
      if(r.ok){
        r.json().then(json => res.json(json))
      }else{
        res.sendStatus(400)
      }
    })
  }
});

const words = new Map()
fs.createReadStream(__dirname+"/../hanziDB.csv")
    .pipe(csv())
    .on('data', (data) => {
      words.set(data.frequency_rank, data)
    })
    .on('end', () => {
    });

router.get("/word", function(req, res, next) {
  if(!req.query.ranking){
    res.sendStatus(400)
  }else{
    var ranking = parseInt(req.query.ranking)
    console.log(words.size)
    if(!isNaN(ranking) && ranking >= 1 && ranking <= words.size){
      res.json(words.get(req.query.ranking))
    }else{
      res.sendStatus(400)
    }
  }

});


module.exports = router;
