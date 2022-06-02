const { response } = require('express')

const Publicacion = require('../models/publicacion')
const Comentario = require('../models/comentario')

const dioLike = async (req = request, res = response, next) => {
    const { id } = req.params
    const  uid  = req.uid
    
    const publicacion = await Publicacion.findById(id)
    if (publicacion) {
        if (publicacion.like.includes(uid)) {
            req.publicacion = true
            req.like = true
        } else {
            req.publicacion = true
            req.like = false
        }
    } else {
        console.log('comentario')
    const comentario = await Comentario.findById(id)
    if (comentario.like.includes(uid)) {
        
        req.like = true
    } else {
        
        req.like = false
    }
    }
    


    
    next()
}

module.exports = {
    dioLike
}