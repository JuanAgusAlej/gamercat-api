const { query } = require('express');
const { response, request } = require('express');
const AboutUse = require('../models/aboutUse');

const aboutUseGet = async (req=request, res=response)=>{
    
    const { limit = 5, size = 0 } = req.query;
    const query = { contratado: true };
    
    const [total, aboutUses] = await Promise.all([
        AboutUse.countDocuments(query),
        AboutUse.find(query)
          .limit(Number(limit))
          .skip(Number(size))
          
      ]);
      res.json({
        total,
        aboutUses,
      });
}
const aboutUsePut = async (req=request, res=response)=>{
    
    const { id } = req.params;
    const {name, email, contratado, ...resto} = req.body
    
    let dato = {}
    if(resto.linkedin) dato.linkedin = resto.linkedin
    if(resto.imagen) dato.imagen = resto.imagen
    if(resto.skill) dato.skill = resto.skill

    const aboutUse = await AboutUse.findByIdAndUpdate(id, dato, { new: true });

    res.status(201).json({
        msg: "put: se guardo correctamente",
        aboutUse,
    });
}
const aboutUsePost = async (req=request, res=response)=>{
    
    const data = {
        name: req.body.name,
        email: req.body.email,
        linkedin: req.body.linkedin,
        imagen: req.body.imagen,
        skill: req.body.skill,
    }
    const aboutuse = new AboutUse(data)
    await aboutuse.save();
    res.status(201).json({
        msg: "post: se guardo correctamente",
        aboutuse,
    });

}
const aboutUseDelete = async (req=request, res=response)=>{
    
    const { id } = req.params;
    
    const aboutUse = await AboutUse.findByIdAndUpdate(id, { contratado: false }, { new: true });
    res.status(201).json({
        msg: "delete: se elimino correctamente",
        aboutUse,
    });
    
}
module.exports = {
    aboutUseGet,
    aboutUsePut,
    aboutUsePost,
    aboutUseDelete
}