const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

module.exports.get_comments = (req, res) => {
    const blogId = req.params.id;

    Comment.find({
        blogId
    }, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.render('comments', {
                title: 'Comments',
                blog_id: blogId,
                comments
            });
        }
    });
}

module.exports.post_comments = (req, res) => {
    const id = req.params.id;
    const comment = req.body.comment;
    const username = req.body.username;
    const profile = req.body.profile;

    Comment.create({
            id,
            comment,
            username,
            profile
        })
        .then(comment => {
            Blog.findByIdAndUpdate(id, {
                    $inc: {
                        comments: 1
                    }
                })
                .then(blog => {
                    res.json(blog);
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
}