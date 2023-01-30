const multer=require('multer');
const path='config\profileImages';
const storage=multer.diskStorage({
destination:function (req,file,cb){
cb(null,'config/profileImages')
}
,
filename:function (req,file,cb){
    cb(null,file.originalname);
}

})
const upload=multer({storage:storage})
module.exports=upload;