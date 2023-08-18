const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [0, 20]
      }
    },
    img: {
      type: DataTypes.TEXT
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 500
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 500
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 500
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 500
      }
    },
    height:{
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 200
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 200
      }
    },
    created:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
     }
  },
  { timestamps: false }
  )};
