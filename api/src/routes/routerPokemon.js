const { Router } = require('express')
const { handlerGetPokemon, handlerGetIdPokemon, handlerPostPokemon } = require('../handlers/handlerPokemon')


const routerPokemon = Router()

const validate = ( req, res, next) => {
   const { name, img, hp, attack, defense, speed, height, weight, type} = req.body;
   if(!name ){ 
       return res.status(400).json({error: `Falta name`})
      }
      if( !img){
       return res.status(400).json({error: `Falta imagen`})
      }
      if(!hp){
       return res.status(400).json({error: `Falta hp`})
      }
      if(!attack){
       return res.status(400).json({error: `Falta attack`})
      }
      if(!defense){
       return res.status(400).json({error: `Falta defense`})
      }
      if(!speed){
       return res.status(400).json({error: `Falta speed`})
      }
      if(!height){
       return res.status(400).json({error: `Falta height`})
      }
      if(!weight){
       return res.status(400).json({error: `Falta weight`})
      }
    

    next();
};
 

routerPokemon
.get("/", handlerGetPokemon)

.get('/:id', handlerGetIdPokemon)

.post('/', validate, handlerPostPokemon)


module.exports = routerPokemon