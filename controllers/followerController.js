const db = require('../models/index')
module.exports.followUser = async (req, resp) => {
    const t = await db.sequelize.transaction();
    try {
        const follower_id = req.userId;
        const { user_Id } = req.body;
        const following = await db.Follower.create({ follower_id, user_Id }, { transaction: t })

        await t.commit();
        console.log(JSON.stringify(following));
        resp.status(200).json({ msg: 'followed successfully' });



    }
    catch (e) {

        console.log(e);
        resp.status(400).json({ msg: 'something went wrong please check' })
    }


}


module.exports.unfollowUser = async (req, resp) => {
    const t = await db.sequelize.transaction();
    try {
        const follower_id = req.userId;
        const { user_Id } = req.body;
        const following = await db.Follower.destroy({ where: { follower_id, user_Id }, transaction: t })

        await t.commit();
        console.log(JSON.stringify(following));
        resp.status(200).json({ msg: 'unfollowed successfully' });



    }
    catch (e) {

        console.log(e);
        resp.status(400).json({ msg: 'something went wrong please check' })
    }


}

module.exports.friendSuggestion = async (req, resp) => 
{

// show all your  followers but your not following them and follower of your follower your not following them



}