

class ErroDefault extends Error{
    constructor(mensagem = "Server error", status = "500"){
        super();
        this.messagem = mensagem;
        this.status = status;
    }


    sendRequest(res){
        res.status(this.status).send({mensagem: this.mensagem, status: this.status});
    }
}

module.exports = ErroDefault;
