const Services = require('./Services')


class ProdutoServices extends Services{
    constructor(){
        super('Produtos')
    }
}


module.exports = ProdutoServices;