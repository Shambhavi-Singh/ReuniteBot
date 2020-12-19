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

  module.export = twitter1;