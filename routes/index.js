//const { Router } = require("express");
const postRouter=require('./postRouter');
const UserRouter=require('./UserRoutes');
const followerRouter=require('./followerRouter');
module.exports= routes=(router)=>
{
 postRouter(router)
 UserRouter(router);
 followerRouter(router);





return router;
}