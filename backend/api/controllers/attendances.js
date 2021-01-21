const mongoose=require('mongoose');
const Attendance = require("../models/attendance");
const Student = require('../models/student');
const Subject = require('../models/subject');
const Class = require('../models/class');

const { success, error, validation } = require("../helpers/responseApi");


exports.attendances_get_all = (req,res,next)=>{
    Attendance.find()
    .select(" class student isAttending ")
    .populate('class','_id date time subject ')
    .populate('student','name _id ')
    .exec()
    .then(docs => {
        const response ={
            count: docs.length,
            attendances: docs.map(doc =>{
                return{
                    
                    _id: doc._id,
                    isAttend:doc.isAttend,
                    class: doc.class,
                    student: doc.student,
                 
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/attedances/'+doc._id
                    }
                }
            })
        };
       
       res.status(200).json(success("OK",response,res.statusCode));
    })
    .catch((err) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
} ;

exports.attendances_create_attendance = (req, res, next)=> {
    Class.findById(req.body.classId)
  //  Student.findById(req.body.studentId)
    .then(classes => {
        if(!classes){
            
          res.status(404).json(error("Class Not found", res.statusCode));
        }

        const attendance = new Attendance({
            
            isAttend: req.body.isAttend,
            class: req.body.classId,
            data:req.body.data,
            time:req.body.time,
            student:req.body.studentId
            
        });
        return attendance.save()
       /* const updatedStudent = await Student.findByIdAndUpdate(student._id, {$push: {attendance: savedRecord._id}}, {new: true});
            res.send({
                message: "SUCCESS",
                savedRecord,
                updatedStudent
            });*/
    })
    .then(result => {
       const response ={
              message: "Created attendance successfully",
              createdAttendance: {
                _id: result._id,
                isAttend: result.isAttend,
                class:result.class,
                student:result.student          
               
               },
               request: {
                type:'GET',
                url: "http://localhost:3000/attendances"+ result._id
            }
        };
          res.status(200).json(success("OK",response,res.statusCode));
        
        })
   
     .catch((err) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
};

exports.attendances_get_attendance = (req , res ,next)=>{
    Attendance.findById(req.params.attendanceId)
    
    .populate('class')
    .populate('student')
    .exec()
    .then(attendance => {
        if(!attendance){
            res.status(404).json(error("Attendance Not found", res.statusCode));
        }
        
            const response = {

                attendance: attendance,
               request: {
                  type: 'GET',
                  url: 'http://localhost:3000/attendances/'
                }
            };
       
        res.status(200).json(success("OK",response,res.statusCode));
    })
    .catch((err) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
 };

 exports.attendances_updates_attendance= (req, res, next)=>{
    const id = req.params.attendanceId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;

    }
    Attendance.update({_id: id},{$set: updateOps})
    .exec()
    .then(result => {
        const response ={
            message:'Attendance updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/attendances/'+ id
            }
        }
        
        res.status(200).json(success("OK",response,res.statusCode));

    })
    .catch((err) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });

};

exports.attendances_delete_attendance = (req, res, next)=>{
    const id =req.params.attendanceId;
    Attendance.remove({_id: id})
    .exec()
    .then(result => {
        const response = {
            message:'Attendance Deleted',
            request: {
             type: 'POST',
            url: 'http://localhost:3000/attendances',
            body: { name:'String'}
 
            }
        }
        res.status(200).json(success("OK",response,res.statusCode));  
    })
    .catch((err) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
 }


