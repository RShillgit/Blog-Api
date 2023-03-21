var express = require('express');
var router = express.Router();
const post = require('../models/posts');
const comment = require('../models/comments');
const { find } = require('../models/admin');

/* GET posts */
router.get('/', function(req, res, next) {
    post.find({}).lean()
    .then((blogs) => {        
        res.json(blogs);
    })
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
router.get('/:id', function(req, res, next) {
    post.findOne({_id: req.params.id})
    .populate('comments')
    .then((blog) => {        
        res.json(blog);
    })
});

/* POST specific post. */
// Used to create comments on a specific post
router.post('/:id', function(req, res, next) {

    // Create a new comment with the front end info
    const newComment = new comment({
        parent_post: req.body.parent_post,
        name: req.body.name,
        text: req.body.text,
        timestamp: req.body.timestamp
    })
    newComment.save()
        // Then add the comment to the parent post's comments array
        .then(
            post.findOne({_id: newComment.parent_post})
                .then(individualPost => {
                    individualPost.comments.push(newComment);
                    individualPost.save()
                })
        )
    next();
});

/* PUT specific post. */
// TODO
//  Allows admins to update posts 
router.put('/:id', function(req, res, next) {
    res.json(`Received a PUT HTTP method on post ${req.params.id}`);
});

/* DELETE specific post. */
// TODO
// Allows admins to delete posts
router.delete('/:id', function(req, res, next) {
    res.json(`Received a DELETE HTTP method ${req.params.id}`);
});

/* DELETE specific comment */
router.delete('/:postId/comments/:commentId', (req, res, next) => {

    const commentId = req.params.commentId;

    // Find and remove comment from post's comments array
    post.findOne({ _id: req.params.postId })
    .then(post => {
        
        const filteredArray = post.comments.filter(comment => comment._id != commentId)

        post.comments = filteredArray;
        post.save();

    })
    .then(
        // Delete comment from the comments DB
        comment.deleteOne({ _id: req.params.commentId })
        .catch(err => console.log(err))
    )
    next();
})

module.exports = router;