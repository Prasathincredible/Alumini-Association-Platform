const mongoose=require('mongoose');

const JobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },

    location:{
        type:String,
        required:true
    },

    jobType:{
        type:String,
        enum:["Full-Time","Part-time","Internship"],
        required:true
    },
    skillsRequired:[
        {type:String}
    ],

    salary:{
        type:String,
    },
    description:{
        type:String,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AluminiProfile",
        required:true
    },
    postedByName:{
        type:String,
        required:true
    },
    appliedUsers:[
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "AluminiProfile" },
            userName: { type: String }
        }
    ]

})


const Job=mongoose.model('Job',JobSchema);

module.exports=Job;