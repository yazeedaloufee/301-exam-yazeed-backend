'use strict'
const mongoose =require('mongoose');
mongoose.connect(`${process.env.MONGOOSE_LINK}`, { useNewUrlParser: true });

const chocolateSchema=new mongoose.Schema({
    id:Number,
    title:String,
    imageUrl:String,
    email:String
})


const ChocolateModel = mongoose.model("mychocolate", chocolateSchema);
module.exports=ChocolateModel;