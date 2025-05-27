//Estructura de la coleccion del usuario

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Crear esquema:

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    birthday: { type: Date },
    password: { type: String, require: true },
    image: { type: String, default: "" },
    rol: {
      type: String,
      default: "estudiante",
      enum: ["estudiante", "profesor"],
    },
  },
  {
    collection: "usuarios",
    timestamps: true, // createAt,updateAt
  }
);

const Usuarios = mongoose.model("usuarios", userSchema);

module.exports = Usuarios;
