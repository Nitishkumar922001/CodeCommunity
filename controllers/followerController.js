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

module.exports.friendSuggestion = async (req, resp) => {

    // show all your  followers but your not following them and follower of your follower your not following them
    try {
        const userId = req.userId;
        console.log(userId);
        const [followerSuggestion] = await db.sequelize.query(`WITH my_followers AS (
            SELECT user_Id
            FROM followers
            WHERE follower_id =${userId}
          ),
          suggested_followers AS (
            SELECT f.follower_id
            FROM followers f
            WHERE f.user_Id = ${userId}
              AND f.follower_id NOT IN (SELECT user_Id FROM my_followers)
          ),
          followers_of_followers AS (
            SELECT f.user_id
            FROM followers f
            WHERE f.follower_id IN (SELECT user_Id FROM my_followers)
              AND f.user_Id NOT IN (SELECT user_Id FROM my_followers UNION SELECT follower_id FROM suggested_followers)
          )
          SELECT u.*
          FROM userprofiles u
          WHERE u.userId IN (SELECT follower_id FROM suggested_followers UNION SELECT user_Id FROM followers_of_followers) and u.userId!=${userId};`, { raw: true })
        resp.status(200).json({ followerSuggestion });


    }
    catch (e) {
        console.log(e);
        resp.status(400).json({ msg: 'something went wrong' })

    }

}