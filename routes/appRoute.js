var express = require('express');
var router = express.Router();

const fetch = require('node-fetch')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.redirect("app/frequentQuiz");
});

router.get('/frequentQuiz', function(req, res, next) {
    res.render("frequentQuiz");
});


module.exports = router;
