const mongoose=require('mongoose');
const Payment = require("../models/payment");
const Student = require("../models/student");
const Subject = require('../models/subject');

const { success, error, validation } = require("../helpers/responseApi");

exports.payments_get_all = (req,res,next)=>{
    Payment.find()
    .select(" subject student date amount isPay ")
    .populate('subject',' _id name fee')
    .populate('student','_id name regNo')
    .exec()
    .then(docs => {
        const response ={
            count: docs.length,
            payments: docs.map(doc =>{
                return{
                    _id: doc._id,
                    student:doc.student,
                    date: doc.date,
                    amount:doc.amount,
                    isPay:doc.isPay,
                  
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/payments/'+doc._id
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

exports.payments_create_payment = (req, res, next)=> {
  Student.findById(req.body.studentId)
    .then(student => {
        if(!student){
           
            res.status(404).json(error("Payment Not found", res.statusCode));
        }
        const payment = new Payment({
            
            date: req.body.date,
            amount:req.body.amount,
            isPay:req.body.isPay,
            student:req.body.studentId
            
        });
        return payment.save()
    })
    .then(result => {
       
      
        const response ={
            message: "Created payment successfully",
              createdPayment: {
               _id: result._id,
                date: result.date,
               amount:result.amount,  
               isPay:result.isPay, 
               student:result.student,
               },
               request: {
                type:'GET',
                url: "http://localhost:3000/payments"+ result._id
            }
        };
          res.status(200).json(success("OK",response,res.statusCode));
        
        })
   
     .catch((err) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
};

exports.payments_get_payment = (req , res ,next)=>{
    Payment.findById(req.params.paymentId)
    .populate('subject')
    .populate('student','name regNo')
    .exec()
    .then(payment=> {
        if(!payment){
            res.status(404).json(error("Payment Not found", res.statusCode));
        }
        
            const response = {
             
                payment: payment,
               request: {
                  type: 'GET',
                  url: 'http://localhost:3000/payments/'
                }
            };
        
        res.status(200).json(success("OK",response,res.statusCode));
    })
    .catch((err) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
 }
 exports.payments_delete_payment = (req, res, next)=>{
    const id =req.params.paymentId;
    Payment.remove({_id: id})
    .exec()
    .then(result => {
        const response = {
            message:'Payment Deleted',
            request: {
             type: 'POST',
            url: 'http://localhost:3000/payments',
            body: { name:'String'}
 
            }
        }
        res.status(200).json(success("OK",response,res.statusCode));  
    })
    .catch((err) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
 }

