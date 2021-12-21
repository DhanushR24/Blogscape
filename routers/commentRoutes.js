const {Router} = require('express');
const router = Router();

const commentController = require('../controllers/commentController');

router.get('/comment/:id', commentController.get_comments);
router.post('/comment/:id', commentController.post_comments);

module.exports = router;