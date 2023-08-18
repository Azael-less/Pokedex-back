const { Type } = require('../db')
const { typesUpdate } = require('../controllers/type')

const handlerGetType = async ( req, res ) => {

try {
    
    const typesFinally = await typesUpdate();

   res.status(200).json(typesFinally)
   
} catch (error) {
    res.status(404).json({error: error.message})
}

}


module.exports = { handlerGetType }