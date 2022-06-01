const { response } = require('express')

const Publicacion = require('../models/publicacion')

const dioLike = async (req = request, res = response, next) => {
    const { id } = req.params
    const  uid  = req.uid
    
    const publicacion = await Publicacion.findById(id)
    


    if (publicacion.like.includes(uid)) {
        req.like = true
    } else {
        req.like = false
    }
    
    next()
}

module.exports = {
    dioLike
}