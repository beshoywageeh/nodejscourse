const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const dataSchema=new Schema({
    name:String,
});
//create a model
const data=mongoose.model('data',dataSchema);
module.exports=data;