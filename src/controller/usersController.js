const userServices = require('../services/UserServices')
const ServicesUser = new userServices();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


class UserController{

    static async readmeUser(req, res){
        try {
            const users = await ServicesUser.readmeRecords();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async readmeOneUser(req, res){
        const {id} = req.params;
        try {
            const user = await ServicesUser.readmeOneRecords(id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(404).json(`usuario de id: ${id} não encontrado!!`);
        }
    }
    
    static async createUser(req, res){
        const senhaHash = await bcrypt.hash(req.body.senha, 10);
        const infos = {...req.body, creditos: 0, senha: senhaHash};
        try {
            const create = await ServicesUser.createRecords(infos);
            return res.status(201).json(create);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async updateUser(req, res){
        const dados = req.body;
        const {id} = req.params
        try {
            const update = await ServicesUser.updateRecords(dados, id)
            return res.status(200).json(update);
        } catch (error) {
            return res.status(404).json(error.message)
        }
    }
    static async deleteUser(req, res){
        const {id} = req.params;
        try {
            const deleteUser = await ServicesUser.deleteRecords(id)
            return res.status(200).json(`${id} deletado com sucesso!`);
        } catch (error) {
            return res.status(404).json(error.message);
        }
    }
    static async autenticar(req, res) {
        const login = req.body.login;
        const senha = req.body.senha;
        try {
                const user = await ServicesUser.buscarUser(login);
                const hash = user.senha;
                bcrypt.compare(senha, hash, async (error, result)=>{
                    if(error){
                        console.log(error)
                        return res.status(500).json(error.message);
                    }else if(result){
                        const payload = {id: user.id, login: user.login, creditos: user.creditos};
                        const token = await ServicesUser.createToken(payload);
                        res.set('Authorization', token)
                        return res.status(200).json({Mensagem: `Olá ${user.nomeUser} seu total de creditos é de: ${user.creditos}`, token: token});
                    }else{
                        return res.status(401).json(`Usuario ou senha invalidos!!`);
                    }
                })
        } catch (error) {
            return res.status(404).json(error.message);
        }
      }

      static async userLogado(req, res){

        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({ mensagem: 'Token não fornecido' });
        }
        const token = authorizationHeader.substring(7); 
        try {
            const decoded = jwt.verify(token, 'teste');
            const userId = decoded.id;
            return res.status(200).json({ userId });
        } catch (error) {
            return res.status(401).json({ mensagem: 'Token inválido' });
        }
    }

}


module.exports = UserController;