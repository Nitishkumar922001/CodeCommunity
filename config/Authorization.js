const jwt=require('jsonwebtoken');
module.exports=auth=async(req,resp,next)=>
{
   try{ if(req.headers.authorization.startsWith('Bearer'))
    {   // get token
        authToken=req.headers.authorization.split(' ')[1];

        
        jwt.verify(authToken,process.env.token,(error,data)=>{
            if(error)
            {
                return resp.status(200).json('unauthorizated user ');
            }
            else          
            {  req.userId=data.userId;
                console.log(data);
                next();
            }
        });
        

    }
    else
    {
        return resp.json({msg:'unauthorizaed req'});

    }
}
catch(e){
    return resp.status(400).json({msg:'unauthorizaed req'});

}


}