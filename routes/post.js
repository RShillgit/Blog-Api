var express = require('express');
var router = express.Router();
const passport = require('passport');
const post = require('../models/posts');
const comment = require('../models/comments');

/* GET that allows admins to access create blog page */
router.get('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json('You are authorized to create a post');
})

/* POST that creates a post. */
router.post('/', function(req, res, next) {

    const newPost = new post({
        title: req.body.blogTitle,
        text: req.body.blogContent,
        timestamp: Date.now(),
        comments: [],
    })
    newPost.save()
        .then((user) => {
            res.send(user);
        })
        .catch(err => next(err));

    // Send a result back to front end so there is no 404 
    res.send('No 404')
});

/* GET specific post. */
router.get('/:id', function(req, res, next) {

    post.findOne({_id: req.params.id})
    .populate('comments')
    .then((blog) => {      
        res.json(blog);
    })
});

/* POST that creates a comment on a specific post. */
router.post('/:id', function(req, res, next) {

    // Create a new comment with the front end info
    const newComment = new comment({
        parent_post: req.params.id,
        name: req.body.name,
        text: req.body.text,
        timestamp: req.body.timestamp
    })
    newComment.save()
        // Then add the comment to the parent post's comments array
        .then(
            post.findOne({_id: req.params.id }) //newComment.parent_post
                .then(individualPost => {
                    individualPost.comments.push(newComment);
                    individualPost.save()
                })
        )

    // Send a result back to front end so there is no 404 
    res.send('No 404')
    next();
});

/* PUT that updates a specific post. */
router.put('/:id', function(req, res, next) {

    post.findOneAndUpdate({ _id: req.params.id }, {
        title: req.body.title,
        text: req.body.content
    })
    .catch(err => console.log(err))

    // Send a result back to front end so there is no 404 
    res.send('No 404')
});

/* DELETE that deletes a specific post. */
router.delete('/:id', function(req, res, next) {

    // Delete Post
    post.deleteOne({ _id: req.params.id })
        .catch(err => console.log(err));

    // Delete any comments associated with this post
    comment.deleteMany({ parent_post: req.params.id })
        .catch(err => console.log(err));

    // Send a result back to front end so there is no 404 
    res.send('Remove 404');
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
    // Send a result back to front end so there is no 404 
    res.send('Remove 404')
    next();
})

module.exports = router;