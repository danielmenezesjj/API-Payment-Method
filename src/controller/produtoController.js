const ProdutoServices = require('../services/ProdutoServices')
const ServicesProdutos = new ProdutoServices();
const UsuariosServices = require('../services/UserServices')
const ServicesUser = new UsuariosServices();
const database = require('../models')
const jwt = require('jsonwebtoken')


class ProdutoController{

    static async readmeAllProduct(req, res){
        try {
            const products = await database.Ccs.findAll({
                where: {
                  deletedAt: null
                }
              });
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json(error.message);            
        }
    }

    static async readmeOneProduct(req, res){
        const {id} = req.params;
        try {
            const product = await ServicesProdutos.readmeOneRecords(id);
            return res.status(200).json(product);
        } catch (error) {
            return res.status(404).json(`product de id: ${id} não encontrado!!`);
        }
    }

    static async createProduct(req, res){
        const dados = req.body;
        try {
            const createProducts = await ServicesProdutos.createRecords(dados)
            return res.status(201).json(createProducts)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async updateProduct(req, res){
        const dados = req.body;
        const {id} = req.params
        try {
            const update = await ServicesProdutos.updateRecords(dados, id)
            return res.status(200).json(update);
        } catch (error) {
            return res.status(404).json(error.message)
        }
    }
    static async deleteProduct(req, res){
        const {id} = req.params;
        try {
            const deleteProduct = await database.Ccs.destroy({where: {id: id}})
            return res.status(200).json(`${id} deletado com sucesso!`);
        } catch (error) {
            return res.status(404).json(error.message);
        }
    }

    static async vendaProduct(req, res) {
        try {
          const { id } = req.params;
          const authorizationHeader = req.headers.authorization;
          
          if (!authorizationHeader) {
            return res.status(400).json('Favor informar seu token!');
          }
          const token = authorizationHeader.substring(7);
          const decoded = jwt.verify(token, 'teste');
          const user = await ServicesUser.readmeOneRecords(decoded.id);
          const creditosArredondados = parseFloat(user.creditos.toFixed(2));
          const vlrProdutoArredondado = parseFloat((await ServicesProdutos.readmeOneRecords(id)).valor.toFixed(2));
          
          if (creditosArredondados >= vlrProdutoArredondado) {
            const newCreditos = creditosArredondados - vlrProdutoArredondado;
    
            const completedPurchase = await ServicesProdutos.updateRecords({ id_usuario: user.id }, id);
            const updateSaldoUser = await ServicesUser.updateRecords({ creditos: newCreditos }, user.id);
      
            return res.status(200).json(`Compra realizada com sucesso, ${user.login} seu saldo atual é de: ${user.creditos}`);
          } else {
            return res.status(200).json(`Saldo insuficiente, ${user.login} seu saldo atual é de: ${user.creditos}`);
          }
        } catch (error) {
          return res.status(500).json('Erro interno do servidor');
        }
      }
}


module.exports = ProdutoController;