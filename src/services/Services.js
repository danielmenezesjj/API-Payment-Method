const database = require('../models')
const { PixPayload, PixCode } = require('node-pix');
const sequelize = require('sequelize')

class Services{
    constructor(model){
        this.model = model;
    }

    async readmeRecords(){
         return database[this.model].findAll();
    }
    async readmeOneRecords(where = {}){
        return database[this.model].findOne({where: {id: where}});
    }
    async createRecords(dados){
        return database[this.model].create(dados);
    }
    async updateRecords(dados, where = {}) {
        const [numRowsUpdated, [updatedRecord]] = await database[this.model].update(dados, {
          where: { id: where },
          returning: true,
        });
        if (numRowsUpdated === 0) {
          throw new Error(`Registro com id ${where} não encontrado`);
        }
        return updatedRecord;
      }
    async deleteRecords(id){
        return database[this.model].destroy({where: {id: id,paranoid: true}});
    }
    
}
module.exports = Services