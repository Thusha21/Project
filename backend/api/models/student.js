const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    regNo:{ type:String, required: true},
    name:{ type:String, required: true},
    grade:{ type:Number, required: true},
    address:{type:String, required: true},
    gender:{type:String, required: true},
    telephoneNo:{ type:Number, required: true},
    guardianName:{ type:String, required: true},
    dob:{type:Date,required: true},
    subject: [{type: mongoose.Schema.Types.ObjectId, ref:'Subject',required : true}],
    //teacher: {type: mongoose.Schema.Types.ObjectId, ref:'Teacher',required : true}
    

    
});
module.exports=  mongoose.model('Student',studentSchema);