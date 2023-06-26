const ProdutoServices = require('../services/ProdutoServices')
const ServicesProdutos = new ProdutoServices();
const UsuariosServices = require('../services/UserServices')
const ServicesUser = new UsuariosServices();
const VendaSerivces = require('../services/VendaServices')
const ServicesVendas = new VendaSerivces();
const jwt = require('jsonwebtoken')


class VendaController{

    static async vendaProduct(req, res) {
        let saldoUser;
        let valorProduto;
        let quantidadeProduto;
        try {
          const { id } = req.params;
          const quantidadeComprada = req.body.quantidadeComprada;
          const authorizationHeader = req.headers.authorization;
          
          if (!authorizationHeader) {
            return res.status(400).json('Favor informar seu token!');
          }
          const token = authorizationHeader.substring(7);
          const decoded = jwt.verify(token, 'teste');
          const user = await ServicesUser.readmeOneRecords(decoded.id);
          const product = await ServicesProdutos.readmeOneRecords(id);
          saldoUser = user.creditos;
          valorProduto = product.valor;
          quantidadeProduto = product.quantidade
          const valorDaVenda = valorProduto * quantidadeComprada;
          console.log({saldoUser: saldoUser})
          console.log({valorDaVenda: valorDaVenda})
          console.log({quantidadeProduto: quantidadeProduto})
          if(saldoUser >= valorDaVenda){
            saldoUser -= valorDaVenda
            quantidadeProduto -= quantidadeComprada;
            const dadosUser = ({creditos: saldoUser});
            const dadosProduct = ({quantidade: quantidadeProduto})
            const dadosVendas = ({id_usuario: decoded.id, id_produto: id, quantidade: quantidadeComprada})
            console.log(dadosVendas)
            const updateSaldoUser = await ServicesUser.updateRecords(dadosUser, decoded.id);
            const updateQuantidadeProduct = await ServicesProdutos.updateRecords(dadosProduct, id);
            const updateVendas = await ServicesVendas.createRecords(dadosVendas);
            return res.status(200).json(`Venda realziada com sucesso!`);
          }else{
            console.log('Não pode comprar o produto');
          }
        } catch (error) {
          return res.status(500).json('Erro interno do servidor');
        }
      }

}



module.exports = VendaController;