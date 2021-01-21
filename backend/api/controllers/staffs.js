const mongoose=require('mongoose');
const Staff = require("../models/staff");

const { success, error, validation } = require("../helpers/responseApi");

exports.staffs_get_all = (req,res,next)=>{
    Staff.find()
    .select("name address gender salary telephoneNo position")
    .exec()
    .then(docs => {
        const response ={
             count: docs.length,
             staffs: docs.map(doc =>{
                 return{
                    _id: doc._id,
                    staffname: doc.name,
                    address:doc.address,
                    gender:doc.gender,
                    telephoneNo:doc.telephoneNo,
                    salary:doc.salary,
                    position:doc.position,
                   
                     request: {
                        type: 'GET',
                        url: 'http://localhost:3000/staffs/'+doc._id
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

exports.staffs_create_staff = (req, res, next)=> {
    const staff = new Staff({
            
            name: req.body.name,
            address:req.body.address,
            gender:req.body.gender,
            telephoneNo:req.body.telephoneNo,
            salary:req.body.salary,
            position:req.body.position 
           
    });
    staff
    .save()
    .then(result => {
       
        const response = {
             message: "Created staff successfully",
             createdStaff: {
             name: result.name,
             address:result.address,
             gender:result.gender,
             telephoneNo:result.telephoneNo,
             salary:result.salary,
             position:result.position,
                   
             request: {
                type:'GET',
                url: "http://localhost:3000/staffs"+ result._id
               }
            }
          };
       
        res.status(200).json(success("OK",response,res.statusCode));
    })
    .catch((err) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
};

exports.staffs_get_staff = (req, res, next)=> {
    const id= req.params.staffId;
    Staff.findById(id)
    .select("name address gender salary telephoneNo position")
    .exec()
    .then(doc => {
        console.log("From database",doc);
        if(doc){
            
             const response ={   
                 staff: doc,
                 requsest: {
                    type: 'GET',
                    url: 'http://localhost:3000/staffs'
                }
            };
         res.status(200).json(success("OK",response,res.statusCode));
           
        }else{
           
           res.status(404).json(error("Staff Not found", res.statusCode));

        }
        
    })

    .catch((err) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });

}

exports.staffs_updates_staff = (req, res, next)=>{
    const id = req.params.staffId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;

    }
    Staff.update({_id: id},{$set: updateOps})
    .exec()
    .then(result => {
       
        const response = {
            message:'Staff updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/staffs/'+ id
            }
        }
        res.status(200).json(success("OK",response,res.statusCode));  
      

    })
    .catch((err) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });

};

exports.staffs_delete_staff = (req, res, next)=>{
    const id =req.params.staffId;
    Staff.remove({_id: id})
    .exec()
    .then(result => {
        const response = {
            message:'Staff Deleted',
            request: {
             type: 'POST',
            url: 'http://localhost:3000/staffs',
            body: { name:'String'}
 
            }
        }
        res.status(200).json(success("OK",response,res.statusCode));  
    })
    .catch((err) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
 }
