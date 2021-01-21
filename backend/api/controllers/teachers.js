const mongoose=require('mongoose');
const Teacher = require("../models/teacher");
const Subject = require('../models/subject');

const { success, error, validation } = require("../helpers/responseApi");

exports.teachers_get_all = (req,res,next)=>{
    Teacher.find()
    .select("name address gender age telephoneNo salary")
    .exec()
    .then(docs => {
        const response ={
            count: docs.length,
            teachers: docs.map(doc =>{
                return{
                    _id: doc._id,
                    teachername: doc.name,
                    address:doc.address,
                    gender:doc.gender,
                    age:doc.age,
                    telephoneNo:doc.telephoneNo,
                    salary:doc.salary,
                   // subject: doc.subject,
                    
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/teachers/'+doc._id
                    }
                }
            })
        };
       
       res.status(200).json(success("OK",response,res.statusCode));
    })
    .catch((err) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
} 

exports.teachers_create_teacher = (req, res, next)=> {
        const teacher = new Teacher({
            name: req.body.name,
            address:req.body.address,
            gender:req.body.gender,
            age:req.body.age,
            telephoneNo:req.body.telephoneNo,
            salary:req.body.salary,
            //subject: req.body.subjectId
            
        });
        return teacher.save()
    
    .then(result => {
       
        const response ={
            message: "Created teacher successfully",
              createdTeacher: {
              _id: result._id,
               //subject:result.subject,
                name: result.name,
                address:result.address,
                gender:result.gender,
                age:result.age,
                telephoneNo:result.telephoneNo,
               salary:result.salary           
            
               },
               request: {
                type:'GET',
                url: "http://localhost:3000/teachers"+ result._id
            }
        };
          res.status(200).json(success("OK",response,res.statusCode));
        
        })
   
     .catch((err) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
};

exports.teachers_get_teacher = (req , res ,next)=>{
    Teacher.findById(req.params.teacherId)
    .exec()
    .then(teacher => {
        if(!teacher){
            res.status(404).json(error("Teacher Not found", res.statusCode));
        }
            const response = {
               teacher: teacher,
               request: {
                  type: 'GET',
                  url: 'http://localhost:3000/teachers/'
                }
            };
        
        res.status(200).json(success("OK",response,res.statusCode));
    })
    .catch((err) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
 }

 exports.teachers_updates_teacher = (req, res, next)=>{
    const id = req.params.teacherId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;

    }
    Teacher.update({_id: id},{$set: updateOps})
    .exec()
    .then(result => {
      
        const response ={
            message:'Teacher updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/teachers/'+ id
            }
        }
       
        res.status(200).json(success("OK",response,res.statusCode));

    })
    .catch((err) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });

}

 exports.teachers_delete_teacher = (req , res ,next)=>{
    Teacher.remove({_id: req.params.teacherId})
    .exec()
    .then(result =>{
     const response = {
         message:"Teacher deleted",
         request: {
             type: "POST",
             url: 'http://localhost:3000/teachers/',
             body:{SubjectId: "ID",fee:"Number"}
           }
        }
        res.status(200).json(success("OK",response,res.statusCode));
    })
    .catch((err) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });

 }