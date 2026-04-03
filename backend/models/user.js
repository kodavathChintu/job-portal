const mongooese = require('mongoose');
const userSchema  = new mongooese.Schema({
    jobId :{
      type:String,
      required:true
   },
   jobrole :{
    type:String,
    required:true
   }, 
   company :{
    type:String,
    required:true 
    },
    experience :{
        type:String,
        required:true
    },
    location :{
        type:String,  
        required:true
    },
    salary :{
        type:String,
        required:true
    }   
});
module.exports = mongooese.model('user', userSchema);