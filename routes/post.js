var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Posts' });
});

/* POST home page. */
router.post('/', function(req, res, next) {
    console.log(req.body.username)
    res.send("Received a POST HTTP method");
});

/* PUT specific post. */
router.put('/:id', function(req, res, next) {
    res.send(`Received a PUT HTTP method on post ${req.params.id}`);
});

/* DELETE specific post. */
router.delete('/:id', function(req, res, next) {
    res.send(`Received a DELETE HTTP method ${req.params.id}`);
});

module.exports = router;