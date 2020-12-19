const mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect("mongodb+srv://dbUser:kush@cluster0.sxtyg.gcp.mongodb.net/my_database?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true},function(err){
  if(!err){
    console.log("no error!");
    
  }
  if(err){
      console.log(err);
  }
})

var twitter1 = mongoose.model("tweeter1",new Schema({
    id:String,
    username:String,
    text:String
  },{collection : "tweet1"}));
console.log(twitter1)
async function getPost(offset)
{
    const limit =8;
    if(!offset){
        offset="0";
    }
    offset=parseInt(offset);
    const response = await new Promise((resolve,reject)=>{
         twitter1.find({},function(err,answer){
             if(err){
                 reject(err);
             }
             resolve(answer)
         }).limit(limit).skip(offset);
    })
    return(response)
}

function createLoadingElement()
{
    let p = document.createElement('p');
    p.innerText = "Loading...";
    document.querySelector('.post-container').insertAdjacentElement
}

module.exports = {getPost};