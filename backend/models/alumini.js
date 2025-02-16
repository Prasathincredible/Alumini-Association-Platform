const mongoose=require('mongoose');

const AluminiSchema=mongoose.Schema(

    {
        userName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        batch:{
            type:String,
            required:true
        },
        company:{
            type:String,
            required:true
        },
        department:{
            type:String,
            required:true
        },
        industry:{
           type:String,
           required:true
        },
        position:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        linkedin:{
            type:String,
            required:true
        },
        github:{
            type:String,
        },
        avatar:{
            type:String
        },
        marksheet:{
            type:String,
            required:true
        },
        status:{
            type:String,
            enum:["pending","approved","rejected"],
            default:"pending"
        }

    }
)

const AluminiProfile=mongoose.model('AluminiProfile',AluminiSchema);

module.exports=AluminiProfile;