const router = require("express").Router();
const checkToken = require("../middleware/auth");

const {
  createCourse,
  addUserToCourse,
  listCourses,
  getAllCourses,
} = require("../controllers/courses.controllers");

router.post("/create", createCourse);

//a;adir un usuario al curso.

router.patch("/modifyUser", addUserToCourse);

//mostrar los cursos con sus usuarios

router.get("/list/:id", listCourses);

//buscar todos los cursos --ruta privada

router.get("/cursosprot", checkToken, getAllCourses);

module.exports = router;
