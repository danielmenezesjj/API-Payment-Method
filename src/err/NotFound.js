const Error = require('./Error')


class NotFound extends Error{
    constructor(mensagem = "Register not found"){
        super(mensagem, 404)
    }
}

module.exports = NotFound