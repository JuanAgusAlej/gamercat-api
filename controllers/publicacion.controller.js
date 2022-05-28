const { response, request } = require("express");
const {check} = require('express-validator');
const { publicacionExiste, existeId } = require("../helpers/db-validators-publicacion");
const { validarCampos } = require("../middlewares/validar-campos");
const  Publicacion  = require("../models/publicacion");

const publicacionGet = async (req = request, res = response) => {
  const { limit = 5, size = 0, id, uid } = req.query;

  if (!id && !uid) {
  
    const [total, publicaciones] = await Promise.all([
      Publicacion.countDocuments(),
      Publicacion.find()
        .limit(Number(limit))
        .skip(Number(size))
        .populate("usuario", "nombre"),
    ]);
    res.json({
      total,
      publicaciones,
    });
  } else if (id) {
    
  
    const error = await existeId(id); 

    // if (!error) {
    //   return res.status(404).json({
    //       msg: "No existe ese id", 
    //     });
    // }
    
    const publicacionId = await Publicacion.findById(id).populate(
      "usuario",
      "nombre"
      );
      
      
      res.json({
        publicacionId,
      });

  } else {
    const query = { usuario: uid }
    const error = await existeId(uid); 

    // if (!error) {
    //   return res.status(404).json({
    //       msg: "No existe ese id", 
    //     });
    // }

    const [total, publicaciones] =await Promise.all([
      Publicacion.countDocuments(query),
      Publicacion.find(query)
        .limit(Number(limit))
        .skip(Number(size))
        .populate("usuario", "nombre"),
    ]);
    

    res.json({
      total,
      publicaciones,
    }); 
  }



};

// const publicacionGetId = async (req = request, res = response) => {
//   const { id, uid } = req.query;

  
//   const publicacionUid = await Publicacion.findOne({ usuario: uid }).populate();  


//   if (!publicacionId && publicacionUid) {
//     return res.status(404).json({
//       msg: "No existe ese id",
//     });
//   }

//   if (publicacionId) {
    
//     res.json({
//       publicacionId,
//     });
//   } else {
    
//     res.json({
//       publicacionUid,
//     });
//   }

  
  
// };

const publicacionGetUid = (req = request, res = response) => {
  return res.status(201).json({
    msg: "get: mostar informacion",
  });
};

const publicacionPost = async (req = request, res = response) => {
  const data = {
    texto: req.body.texto,
    usuario:req.usuario._id
  };
  if(req.body.imagen) data.imagen = req.body.imagen 

  const publicacion = new Publicacion(data);
  await publicacion.save();
  res.status(201).json({
    msg: "post: se guardo correctamente",
    publicacion,
  });
};

const publicacionPut = async (req = request, res = response) => {
  const { id } = req.params;
  
  const userid = req.usuario._id
  
  const publicacion = await Publicacion.findById(id)


  const dioLik = await publicacion.like.includes(uid => 
         uid === userid
  );

  console.log(dioLik);
  if (dioLik) {
    publicacion.like.splice(publicacion.like.indexOf(uid => uid === userid), 1);
    console.log("diolik")
  } else {
    publicacion.like.push(userid);
  }

  
    const publicacionActualizada = await Publicacion.findByIdAndUpdate(id, publicacion, { new: true });
    res.status(201).json({
        msg: "put: se actualizo correctamente",
        publicacionActualizada,
    });
};


const publicacionDelete = async (req = request, res = response) => {
  
    const { id } = req.params;
  const publicacion = await Publicacion.findByIdAndDelete(id);
    res.status(201).json({
        msg: "delete: se elimino correctamente",
        publicacion,
    });

};

module.exports = {
  publicacionGet,
  publicacionPost,
  publicacionPut,
  publicacionDelete,
    
};
