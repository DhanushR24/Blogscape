const Blog = require('../models/Blog');

module.exports.get_blogs = (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log(err);
            return;
        }
        // res.send(blogs);
        res.render('blogs', {
            title: 'blogs',
            allblogs: blogs
        });
    });
}

module.exports.get_all_blogs = (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(blogs);
    });
}

module.exports.post_blog = (req, res) => {
    console.log(req.body);
    const {
        title,
        description,
        category,
        username,
        profile
    } = req.body;

    const blog = new Blog({
        title,
        description,
        category,
        username,
        profile
    });

    blog.save((err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Blog saved successfully');
        res.redirect('blogs');
    });
}

module.exports.get_create_blog = (req, res) => {
    res.render('createBlogs', {
        title: 'Create Blog'
    });
}
