const bodyParser = require('body-parser');
const usersRoute = require('./usersRoute')
const authRoute = require('./authRoute')
const pixRoute = require('./pixRoute')
const produtoRoute = require('./produtosRoute')

module.exports = (app) =>{
    app.use(bodyParser.json())
    app.use(usersRoute)
    app.use(authRoute)
    app.use(pixRoute)
    app.use(produtoRoute)
}