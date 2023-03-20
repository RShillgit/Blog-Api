var express = require('express');
var router = express.Router();
const post = require('../models/posts');

/* GET posts */
router.get('/', function(req, res, next) {
    post.find({}).lean()
    .then((blogs) => {        
        res.json(blogs);
    })

    //res.render('posts');
});

/* POST home page. */
router.post('/', function(req, res, next) {

    // TODO: TEMPORARY - Delete once no longer creating blog posts, or only allow admins to access
    const newPost = new post({
        title: req.body.title,
        text: req.body.content,
        timestamp: Date.now(),
        comments: [],
    })
    newPost.save()
        .then((user) => {
            res.send(user);
        })
        .catch(err => next(err));

});

/* GET specific post. */
router.put('/:id', function(req, res, next) {
    res.json(`Received a GET HTTP method on post ${req.params.id}`);
});

/* POST specific post. */
router.put('/:id', function(req, res, next) {
    res.json(`Received a POST HTTP method on post ${req.params.id}`);
});

/* PUT specific post. */
router.put('/:id', function(req, res, next) {
    res.json(`Received a PUT HTTP method on post ${req.params.id}`);
});

/* DELETE specific post. */
router.delete('/:id', function(req, res, next) {
    res.json(`Received a DELETE HTTP method ${req.params.id}`);
});

module.exports = router;