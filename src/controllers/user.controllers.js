//Crear las funciones para acceder a los datos
const Usuarios = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//funcion para a;adir usuario a la BD

const createUser = async (req, res) => {
  try {
    console.log("se hacreado el usario");
    //recogemos del dato del user
    const data = req.body;
    const newUser = new Usuarios(data);
    //lo guardamos en la base de datos
    const userCreated = await newUser.save();
    res.json({ succes: true, data: userCreated });
  } catch (error) {
    res.json(error);
  }
};

const listUsers = async (req, res) => {
  try {
    const list = await Usuarios.find();
    res.json({
      sucess: true,
      data: list,
    });
  } catch (error) {
    res.json(error);
  }
};

const listByName = async (req, res) => {
  //obtener los datos
  const { name } = req.query;

  //buscar los usuarios que tengan el string name;
  const list = await Usuarios.find({ name: new RegExp(name, "i") });
  res.json({
    sucess: true,
    data: list,
  });
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;

    const userUpdated = await Usuarios.findByIdAndUpdate(id, user, {
      new: true,
      overwrite: true,
      runValidators: true,
    });

    if (!userUpdated) {
      res.json({
        sucess: false,
        message: "Usuario no encontrado",
      });
    } else {
      res.json({
        sucess: true,
        message: "Usuario modificado con exito",
        data: userUpdated,
      });
    }
  } catch (error) {
    res.json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userDeleted = await Usuarios.findByIdAndDelete(id);
    if (!userDeleted) {
      res.json({
        sucess: false,
        message: "Usuario no encontrado",
      });
    } else {
      res.json({
        sucess: true,
        message: "Usuario eliminado con exito",
        data: userDeleted,
      });
    }
  } catch (error) {
    res.json(error);
  }
};

const registerUser = async (req, res) => {
  try {
    const data = req.body;
    //validad que es e-mail no exista
    const userDB = await Usuarios.find({ email: data.email });
    if (userDB.length !== 0) {
      res.json({
        success: false,
        message: "El email ya existe",
      });
    } else {
      data.password = bcrypt.hashSync(data.password, 10);
      const newUser = new Usuarios(data);
      const createdUser = await newUser.save();
      res.json({
        success: true,
        info: createdUser,
      });
    }
  } catch (error) {
    res.json(error);
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
    //validar si el email y contrase;a existen
    const userDB = await Usuarios.findOne({ email: data.email });
    if (userDB) {
      //comparar la contrase;a enviada con la BD encriptada.
      const isSame = bcrypt.compareSync(data.password, userDB.password);
      if (!isSame) {
        res.json({ success: false, message: "Contraseña incorrecta" });
      }
      //coinciden las contrase;as y se crea el token
      //si existe creamos en token
      const dataToken = {
        id: userDB._id,
        email: userDB.email,
        rol: userDB.rol,
      };
      const token = jwt.sign(dataToken, process.env.PASS_TOKEN, {
        expiresIn: "1h",
      });
      res.json({
        succes: true,
        token: token,
      });
    }

    res.json({ success: false, message: "Email no existe" });

    //sino error
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getProfile = async (req, res) => {
  const { id, email, rol } = req.userLogin;
  const userDB = await Usuarios.findById(id);
  res.json(userDB);
};

module.exports = {
  createUser,
  listUsers,
  listByName,
  updateUser,
  deleteUser,
  registerUser,
  login,
  getProfile,
};
