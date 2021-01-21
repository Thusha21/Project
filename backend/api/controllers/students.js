const mongoose = require("mongoose");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Subject = require("../models/subject");

const { success, error, validation } = require("../helpers/responseApi");

exports.students_get_all = (req, res, next) => {
  Student.find()
    .select(" subject name regNo grade address gender telephoneNo dob guardianName ")
    .populate("subject", "name fee")
    //.populate('teacher','name ')
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        students: docs.map((doc) => {
          return {
            _id: doc._id,
            studentname: doc.name,
            regNo:doc.regNo,
            grade: doc.grade,
            address: doc.address,
            gender: doc.gender,
            telephoneNo: doc.telephoneNo,
            dob: doc.dob,
            guardianName: doc.guardianName,
            subject: doc.subject,
            //teacher: doc.teacher,

            request: {
              type: "GET",
              url: "http://localhost:3000/students/" + doc._id,
            },
          };
        }),
      };

      res.status(200).json(success("OK", response, res.statusCode));
    })
    .catch((err) => {
      res.status(500).json(error("Something went wrong", res.statusCode));
    });
};

exports.students_create_student = (req, res, next) => {
  const student = new Student({
    name: req.body.name,
    regNo:req.body.regNo,
    grade: req.body.grade,
    address: req.body.address,
    gender: req.body.gender,
    telephoneNo: req.body.telephoneNo,
    dob: req.body.dob,
    guardianName: req.body.guardianName,
    subject: req.body.subjectId,
    // teacher:req.body.teacherId
  });
  student
    .save()
    .then((result) => {
      const response = {
        message: "Created student successfully",
        createdStudent: {
          _id: result._id,
          name: result.name,
          regNo:result.regNo,
          grade: result.grade,
          address: result.address,
          gender: result.gender,
          telephoneNo: result.telephoneNo,
          guardianName: result.guardianName,
          dob: result.dob,
          subject: result.subject,
          //teacher:result.teacher
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/students" + result._id,
        },
      };
      res.status(200).json(success("OK", response, res.statusCode));
    })

    .catch((err) => {
      res.status(500).json(error("Something went wrong", res.statusCode));
    });
};

exports.students_get_student = (req, res, next) => {
  Student.findById(req.params.studentId)

    .populate("subject")
    //.populate('teacher')
    .exec()
    .then((student) => {
      if (!student) {
        res.status(404).json(error("Student Not found", res.statusCode));
      }

      const response = {
        student: student,
        request: {
          type: "GET",
          url: "http://localhost:3000/students/",
        },
      };

      res.status(200).json(success("OK", response, res.statusCode));
    })
    .catch((err) => {
      res.status(500).json(error("Something went wrong", res.statusCode));
    });
};

exports.students_updates_student = (req, res, next) => {
  const id = req.params.studentId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Student.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      const response = {
        message: "Student updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/students/" + id,
        },
      };

      res.status(200).json(success("OK", response, res.statusCode));
    })
    .catch((err) => {
      res.status(500).json(error("Something went wrong", res.statusCode));
    });
};

exports.students_delete_student = (req, res, next) => {
  Student.remove({ _id: req.params.studentId })
    .exec()
    .then((result) => {
      const response = {
        message: "Student deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/students/",
          body: { studentId: "ID" } /*doubt all attribute or not */,
        },
      };
      res.status(200).json(success("OK", response, res.statusCode));
    })
    .catch((err) => {
      res.status(500).json(error("Something went wrong", res.statusCode));
    });
};
