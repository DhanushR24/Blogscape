const { Router } = require('express');
const router = Router(); 
const blogController = require('../controllers/blogController')

router.get('/blogs', blogController.get_blogs);
router.get('/loadBlogs', blogController.get_all_blogs);
router.get('/loadBlogs/:user',blogController.get_user_blogs)

router.get('/createBlog', blogController.get_create_blog);
router.post('/createBlog', blogController.post_blog);
router.put('/likeBlog/:id', blogController.like_blog);
router.delete('/deleteBlog/:id', blogController.delete_blog);

module.exports = router;