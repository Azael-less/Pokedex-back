const { findPokemon, getPokemon, getById, createPokemon } = require('../controllers/pokemon')


const handlerGetPokemon = async (req, res) => {
    try {

        const { name } = req.query
        const pokemon = name ? await findPokemon(name) : await getPokemon()
        res.status(200).json(pokemon)

    } catch (error) {
        res.status(404).json({ error: "No existe ese pokemon en la Bdd ni el la API" })
    }
}

const handlerGetIdPokemon = async (req, res) => {
    const { id } = req.params
    try {
        const source = isNaN(id) ? "bdd" : "api"
        const pokeid = await getById(id, source)
        res.status(200).json(pokeid)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const handlerPostPokemon = async (req, res) => {
    const { name, img, hp, attack, defense, speed, height, weight, type } = req.body
      
    try {
      
        await createPokemon(name, img, hp, attack, defense, speed, height, weight, type)
        res.status(201).send(`Se creo correctamente el pokemon ${name}`)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}


module.exports = { handlerGetPokemon, handlerGetIdPokemon, handlerPostPokemon }