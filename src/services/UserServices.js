const Services = require('./Services')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const database = require('../models')

class UserServices extends Services{
    constructor(){
        super('Users')
    }

    async createToken(payload){
        return jwt.sign(payload, 'teste', {expiresIn: '24h'});
    }

    async buscarUser(where = {}){
        return database[this.model].findOne({where: {login: where}});
  
      }

      async updateCreditos(dados, where = {}) {
        const [numRowsUpdated, [updatedRecord]] = await database[this.model].update(
          { creditos: sequelize.literal(`creditos + ${dados.creditos}`) },
          {
            where: { id: where },
            returning: true
          }
        );
        if (numRowsUpdated === 0) {
          throw new Error(`Registro com id ${where} não encontrado`);
        }
        return updatedRecord;
      }

}

module.exports = UserServices