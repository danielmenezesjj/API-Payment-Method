const mercadopago = require("mercadopago");
require('dotenv').config()


mercadopago.configurations.setAccessToken(process.env.SETACESSTOKEN);

module.exports = mercadopago;