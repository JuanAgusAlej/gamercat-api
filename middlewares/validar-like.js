const { response } = require('express')

const Publicacion = require('../models/publicacion')
const Comentario = require('../models/comentario')
const {validationResult} = require('express-validator');


const dioLike = async (req = request, res = response, next) => {
    const { id } = req.params
    const  uid  = req.uid
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
        const publicacion = await Publicacion.findById(id)
        if (publicacion) {
            if (publicacion.like.includes(uid)) {
                req.publicacion = true
                req.like = true
            } else {
                req.publicacion = true
                req.like = false
            }
    next()

        } else {
            console.log('comentario')
            const comentario = await Comentario.findById(id)
            if (comentario.like.includes(uid)) {
        
                req.like = true
            } else {
        
                req.like = false
            }
    next()

        }
    
    } else {
        res.status(404).json({
            ok: false,
            msg: 'El id no es valido'
        });
    }

    
}

module.exports = {
    dioLike
}