const { response, request } = require('express');

const aboutUseGet =(req=request, res=response)=>{
    
    
    return response.status(201).json({
        msg: 'get: mostar informacion',
    });
}
const aboutUsePut =(req=request, res=response)=>{
    
    
    return response.status(201).json({
        msg: 'get: mostar informacion',
    });
}
const aboutUsePost =(req=request, res=response)=>{
    
    
    return response.status(201).json({
        msg: 'get: mostar informacion',
    });
}
const aboutUseDelete =(req=request, res=response)=>{
    
    
    return response.status(201).json({
        msg: 'get: mostar informacion',
    });
}
module.exports = {
    aboutUseGet,
    aboutUsePut,
    aboutUsePost,
    aboutUseDelete
}