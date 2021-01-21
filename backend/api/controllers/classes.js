const mongoose = require("mongoose");
const Class = require("../models/class");
//const Teacher = require("../models/teacher");
const Subject = require("../models/subject");

const { success, error, validation } = require("../helpers/responseApi");

exports.classes_get_all = (req, res, next) => {
  Class.find()
    .select("subject teacher name date time  ")
    .populate('subject','name')
    //.populate("teacher")
    // .populate("degree")
    // .populate('subject.teacher', '_id name')
     .populate('subject.teacher','name')
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        cls: docs.map((doc) => {
          return {
            _id: doc._id,
            date: doc.date,
            time: doc.time,
            subject: doc.subject,
            // teacher: doc.teacher,

            request: {
              type: "GET",
              url: "http://localhost:3000/classes/" + doc._id,
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

exports.classes_create_class = (req, res, next) => {
  Subject.findById(req.body.subjectId)
  .exec()
    .then((subject) => {
      if (!subject) {
        res.status(404).json(error("Subject Not found", res.statusCode));
      }
      const cls = new Class({
        date: req.body.date,
        time: req.body.time,
        subject: req.body.subjectId,
        // teacher:req.body.teacherId
      });
     cls.save()
      .then((result) => {
        const response = {
          message: "Created class successfully",
          createdClass: {
            _id: result._id,
            date: result.date,
            time: result.time,
            subject: result.subject,
            //teacher:result.teacher
          },
          request: {
            type: "GET",
            url: "http://localhost:3000/classes" + result._id,
          },
        };
        res.status(200).json(success("OK", response, res.statusCode));
      })
      .catch((err) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
    })
    .catch((err) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
 
};

exports.classes_get_class = (req, res, next) => {
  Class.findById(req.params.classId)

    .populate("subject")
    //.populate('teacher','name')
    .exec()
    .then((cls) => {
      if (!cls) {
        res.status(404).json(error("Class Not found", res.statusCode));
      }

      const response = {
        cls: cls,
        request: {
          type: "GET",
          url: "http://localhost:3000/classes/",
        },
      };

      res.status(200).json(success("OK", response, res.statusCode));
    })
    .catch((err) => {
      res.status(500).json(error("Something went wrong", res.statusCode));
    });
};

exports.classes_updates_class = (req, res, next) => {
  const id = req.params.classId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Class.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      const response = {
        message: "Class updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/classes/" + id,
        },
      };

      res.status(200).json(success("OK", response, res.statusCode));
    })
    .catch((err) => {
      res.status(500).json(error("Something went wrong", res.statusCode));
    });
};

exports.classes_delete_class = (req, res, next) => {
  const id = req.params.classId;
  Class.remove({ _id: id })
    .exec()
    .then((result) => {
      const response = {
        message: "Class Deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/classes",
          body: { name: "String" },
        },
      };
      res.status(200).json(success("OK", response, res.statusCode));
    })
    .catch((err) => {
      res.status(500).json(error("Something went wrong", res.statusCode));
    });
};
