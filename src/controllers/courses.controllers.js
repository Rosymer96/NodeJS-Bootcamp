const Courses = require("../models/course.model");

const createCourse = async (req, res) => {
  const newCourse = new Courses(req.body);
  const courseCreated = await newCourse.save();
  res.json(courseCreated);
};

const addUserToCourse = async (req, res) => {
  const { idC, idU } = req.body;
  const modifyCourse = await Courses.findByIdAndUpdate(
    idC,
    { $addToSet: { users: idU } },
    //{ $push: { usuarios: idU } }, se podria usar en otros casosporque podria generar usuarios repetidos.
    { new: true }
  );
  if (!modifyCourse) {
    res.json({
      message: "No existe el curso",
    });
  }
  res.json({ modifyCourse });
};

const listCourses = async (req, res) => {
  const { id } = req.params;
  const courseFound = await Courses.findById(id).populate(
    "users",
    "name email rol"
  );
  res.json(courseFound);
  // find({apellido: "Perez"}) o Regex ({ name: new RegExp(name, "i") })
};

const getAllCourses = async (req, res) => {
  const all = await Courses.find().populate("users");
  res.json(all);
};
module.exports = { createCourse, addUserToCourse, listCourses, getAllCourses };
