const { Router } = require('express')
const { handlerGetType } = require('../handlers/handlerType')

const routerType = Router()


routerType.get('/', handlerGetType)



module.exports = routerType