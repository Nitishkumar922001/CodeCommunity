const express=require('express');
const routes = require('./routes/index');
const bodyParser=require('body-parser');
const app=express();
const router=express.Router();
const cookieParser=require('cookie-parser');
app.use(bodyParser.urlencoded({extended:true}));
 app.use(cookieParser(),(req,resp,next)=>{next();});
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded,formData, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
    next();
});
app.use('/',routes(router));

app.listen(9000,()=>{
console.log('listening on port 9000');
})