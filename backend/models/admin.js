const mongoose=require('mongoose');

const AdminSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },

        role:{
            type:String,
            enum:['superAdmin','event manager', 'content manager'],
            default:"content manager"
        },   
    },
    {
        timestamps:true
    }
)


const AdminProfile=mongoose.model('AdminProfile',AdminSchema);

module.exports=AdminProfile;