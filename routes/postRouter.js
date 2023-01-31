const postController = require('../controllers/postController')
const validate = require('../config/validator');
const { body,check } = require('express-validator');
const upload = require('../config/postImage');
// const sendpic=upload.single('photo');
module.exports = postRouter = (router) => {

    router.post('/createPost',auth,upload.single('photo'), 
     validate([check('title').not().isEmpty().withMessage('title field is required').bail().isLength({ min: 4, max:20 }).withMessage('title length is should be minmum  4 charactors and maximum 10 charactors'),
     check('postBody').not().isEmpty().withMessage('title field is required').bail().isLength({ min: 4, max:500 }).withMessage('title length is should be minmum  4 charactors and maximum 10 charactors')
]),postController.createPost);

router.get('/getPosts',postController.getPosts);
router.get('/showMyPosts',auth,postController.showMyPosts);
router.delete('/DeletePost/:postId',postController.deletePost)
router.post('/Comment',auth,postController.comment);
router.get('/showComments/:postId',postController.getCommentsByPostId);
router.get('/PostsofFolloweduser',auth,postController.getPostOfFollowedUsers);
}