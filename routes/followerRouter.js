const auth=require('../config/Authorization');
const followerController=require('../controllers/followerController');
module.exports=(Router)=>
{
Router.post('/followUser',auth,followerController.followUser);
Router.post('/unfollowUser',auth,followerController.unfollowUser);
Router.get('/friendSuggestion',auth,followerController.friendSuggestion);
}