const mongoose=require('mongoose');

const conversationSchema=new mongoose.Schema({
    sender:
        {
        type:String,
        required:true,
    },

    receiver:{
        type:String,
        required:true,
    },

    lastMessage:{
        type:String,
        default:"",
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('Conversation',conversationSchema);