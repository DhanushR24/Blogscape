const Comment = require('../models/Comment');
const Blog = require('../models/Blog');
const {
    checkUser
} = require('../middleware/authMiddleware');

module.exports.get_comments = (req, res, next) => {
    const id = req.params.id;

    Comment.find({
        blogId: id
    }, (err, comments) => {
        if (err) {
            // console.log(err);
        } else {
            // console.log(comments);
            // res.json(comments);
            Blog.findById(id)
                .then((result) => {
                    // checkUser(req, res, next);
                    res.render('comments', {
                        title: 'Comments',
                        blog_id: id,
                        blog: result,
                        comments
                    });
                })
        }
    });
}

module.exports.post_comments = (req, res) => {
    const id = req.params.id;
    const comment = req.body.comment;
    const username = req.body.username;
    const profile = req.body.profile;

    console.log(id);

    Comment.create({
            blogId: id,
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
                    res.redirect(`/comment/${id}`);
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
}