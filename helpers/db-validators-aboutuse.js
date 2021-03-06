const AboutUse = require("../models/aboutUse");

const emailExiste = async (email) => {
    const existeEmail = await AboutUse.findOne({ email });
    if (existeEmail) {
      throw new Error(`El correo ${correo} ya está registrado`);
    }
};

const aboutUseExiste = async (id) => {
    const existeAboutUse = await AboutUse.findById(id);
    if (!existeAboutUse) {
        throw new Error(`No existe un aboutUse con el id ${id}`);
    }
};

module.exports = {
    emailExiste,
    aboutUseExiste
};