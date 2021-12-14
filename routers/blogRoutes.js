const { Router } = require('express');
const router = Router(); 
const blogController = require('../controllers/blogController')

router.get('/blogs', blogController.get_blogs);

router.get('/createBlog', blogController.get_create_blog);
router.post('/createBlog', blogController.post_blog);

module.exports = router;