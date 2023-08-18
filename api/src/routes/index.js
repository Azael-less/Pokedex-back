const { Router } = require('express');
const routerPokemon = require ('./routerPokemon')
const  routerType = require('./routerType') 


const router = Router();

router.use('/pokemon', routerPokemon)
router.use('/type', routerType)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
