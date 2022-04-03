const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
    {
            id:{type:Number, required:true},
            name:{type:String, required:true},
            img:{type:String, required:true},
            type:{type:String, required:true},
            link:{type:String, required:true},
    
      
    }

)

module.exports = mongoose.model("allapp", homeSchema);