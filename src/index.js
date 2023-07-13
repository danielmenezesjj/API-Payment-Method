const express = require("express");
const routes = require('./routes/index');
const app = express();
const path = require("path");
const port = 3001;
const cors = require('cors');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');
const productsDocument = require('./productsDocument.json');
const pixDocument = require('./pix.json')
const authDocument = require('./auth.json')






const combinedDocument = {
    ...swaggerDocument,
    paths: {
      ...authDocument.paths,
      ...swaggerDocument.paths,
      ...productsDocument.paths,
      ...pixDocument.paths
    }
  };

app.set("view engine", "ejs");
app.use(cors());
app.set("views", path.join(__dirname, "views"));
routes(app);
const swaggerOptions = {
  swaggerOptions: {
    requestInterceptor: (req) => {
      // Adicionar o token JWT no cabeçalho "Authorization"
      req.headers['Authorization'] = 'Bearer SEU_TOKEN_JWT';
      return req;
    },
  },
};

// Rota para a documentação do Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(combinedDocument, swaggerOptions));

app.listen(port, () => console.log(`A api está rodando na porta ${port}`));
module.exports = app;