const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    
    date:{type:Date,required: true},
    amount:{type:Number,required: true},
    isPay:{ type:String, required: true},
    student: {type: mongoose.Schema.Types.ObjectId, ref:'Student',required : true}

});
module.exports=  mongoose.model('Payment',paymentSchema);