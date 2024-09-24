const mongoose =require('mongoose');

const userschema = new mongoose.Schema({
    name:{
        required:true,
        type:String,
        trim:true,
    },
    image:{
        required:true,
        type:String,
    },
    prize:{
        required:true,
        type:Number,
        
    },
    description:{
        required:true,
        type:String,
        trim:true,
    },
})

const user =mongoose.model('user',userschema);
module.exports=user;