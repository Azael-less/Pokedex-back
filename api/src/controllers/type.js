const { Type } = require('../db')
const axios = require('axios')


const URL_BASE = 'https://pokeapi.co/api/v2/type'

const typesUpdate = async () => {

    const types = await Type.findAll()
 

    if(types.length === 0){
    const typesApi = (await (axios.get(URL_BASE))).data.results
    
    const typesName = typesApi.map((elem) => elem.name)

    await Type.bulkCreate(typesName.map((name) => ({name})))   

    return "Se agregaron los Types correctamente"
    }
    
    return types
}



module.exports = { typesUpdate }