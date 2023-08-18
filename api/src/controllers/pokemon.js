const axios = require('axios')
const { Pokemon, Type } = require('../db')
const { Op } = require('sequelize')
const URL_BASE = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=40'
const https = require("https");


const api = axios.create({
    retries: 6,
    retryDelay: 1000, // Retraso entre reintentos en milisegundos
  });

 
  const getAllPokemon = async () => {
    const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=48");
    const apiInfo = await Promise.all(
      apiUrl.data.results.map(async (elem) => {
        const Data = await axios.get(elem.url);
        return {
          id: Data.data.id,
          name: Data.data.name,
          img: Data.data.sprites.other.dream_world.front_default,
          hp: Data.data.stats[0].base_stat,
          attack: Data.data.stats[1].base_stat,
          defense: Data.data.stats[2].base_stat,
          speed: Data.data.stats[5].base_stat,
          height: Data.data.height,
          weight: Data.data.weight,
          types: Data.data.types.map((type) => type.type.name),
          created: false
        };
      })
    );
    return apiInfo;
  };
  

const cleanPokemon = (data) => {
        return {
            id: data.id,
            name: data.name,
            img: data.sprites.other.dream_world.front_default,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
            types: data.types.map((type) => type.type.name),
            created: false
        }
    }


const getPokemon = async () => {
    //busco en base de datos
    const pokemonBd = await Pokemon.findAll({
        include: {
            model: Type, attributes: ["name"], through: { attributes: [] }
        }
    })
    // busco en api
    const pokeInfo = await getAllPokemon()


    // retorno la informacion sacada de la api y la bdd
    return [...pokemonBd, ...pokeInfo]

}


const findPokemon = async (name) => {

    const nameLower = name.toLowerCase().trim()

    //busco en base de datos
    const pokeName = await Pokemon.findAll({
        where: {
            name: { [Op.iLike]: `%${name}%` }
        },
        include: {
            model: Type,
            attributes: ["name"],
            through: { attributes: [] }
        }
    })

    //verifico si encontro lo que pedi en la base de datos
    if (pokeName && pokeName.length > 0) {
        return pokeName
    } else {
        //busco en api   
        const cleanpoke = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameLower}`)).data
        const pokeFind = cleanPokemon(cleanpoke)
        console.log(pokeFind)
        return[ pokeFind]
    }

}


const getById = async (id, source) => {

    // if (source === "api") {
    //     const data = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data
    //     const PokeResult = cleanPokemon(data)
    //     return PokeResult
    // }

    // const pokeBdd = await Pokemon.findByPk(id, {
    //     include: {
    //         model: Type, attributes: ["name"], through: { attributes: [] }
    //     }
    // })
  
    // return  [ pokeBdd ]
    if(id){
        const allpoke = await getPokemon()
        const pokemon = allpoke.find((elem) => elem.id == id)
        return pokemon
    }
    }
   


const createPokemon = async (name, img, hp, attack, defense, speed, height, weight, type) => {

    const newPokemon = await Pokemon.create({ name, img, hp, attack, defense, speed, height, weight })

    const existType = await Type.findAll({ where: { name: type } })
    console.log(existType.map((ele) => ele.id))
    if (!existType) {
        throw new Error('no existe ese type');
    }

    await newPokemon.addTypes(existType.map((ele) => ele.id))
    return newPokemon
}





module.exports = { findPokemon, getPokemon, getById, createPokemon }


