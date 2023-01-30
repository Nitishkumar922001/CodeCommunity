const { sequelize } = require('../models/index');
const db = require('../models/index');


module.exports.createPost = async (req, resp) => {
    const t = await sequelize.transaction();
    const { title, postBody, photo } = req.body;
    const userId = req.userId;
    const postImage = req.file.path;
    try {
        const post = await db.post.create({ postedBy: userId, title: title, body: postBody, postImage }, { transaction: t });
        await t.commit();
        resp.send(JSON.stringify(post));

    }
    catch (E) {
        console.log(E);
        await t.rollback();
        resp.status(400).json({ error: E });

    }

}
module.exports.deletePost = async (req, resp) => {

    const { postId } = req.params;
    const t = await db.sequelize.transaction();
    try {
        const result = await db.post.destroy({ where: { postid: postId }, transaction: t })
        await t.commit();
        resp.status(200).json({ msg: 'post is Deleted sucessfully' });

    }
    catch (Err) {
        await t.rollback();
        resp.status(200).json({ error: Err });

    }


}


module.exports.getPosts = async (req, resp) => {

    // const t =sequelize.transaction();
    try {

        const posts = await db.post.findAndCountAll();
        resp.status(200).json({ data: posts })

    }
    catch (E) {
        console.log(E);
        resp.status(400).json({ error: E });
    }
}


module.exports.showMyPosts = async (req, resp) => {
    try {
        const postedBy = req.userId;
        const posts = await db.post.findAndCountAll({ where: { postedBy } })
        resp.status(200).json({ posts });

    }
    catch (Err) {
        resp.status(400).json({ error: Err });

    }


}
module.exports.comment = async (req, resp) => {
    const commentedBy = req.userId;
    const { postId,comment } = req.body;
    const t = await db.sequelize.transaction();
    try {
        const com = await db.comment.create({ postId, commentedBy, comment }, { transaction: t })
        await t.commit();
        resp.status(200).json({ com });


    }
    catch (Err) {
        console.log(Err);
        resp.status(400).json({ err: Err });

    }
}
module.exports.getCommentsByPostId=async(req,resp)=>{
try{const {postId}=req.params;
console.log(postId);
const [comments]=await db.sequelize.query(`SELECT comments.comment,userprofiles.firstName,userprofiles.lastName from comments INNER join userprofiles on comments.commentedBy=userprofiles.userId WHERE comments.postId=${postId};`,{ raw: true })
//console.log(comments);
const count=comments.length;
resp.status(200).json({comments,count});
}
catch(e)
{
    console.log({error:e});
    resp.status(400).json({msg:'something went wrong !!'});
}




}