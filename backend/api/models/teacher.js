const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: String, required: true },
    telephoneNo: { type: Number, required: true },
    salary: { type: Number, required: true },
    //subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true }


});
module.exports = mongoose.model('Teacher', teacherSchema);