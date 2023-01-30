const crypto=require('crypto');

module.exports=hashing=(password)=>
{
const hash=crypto.createHash('sha512');
let data=hash.update(password);
return data.digest('hex');
}