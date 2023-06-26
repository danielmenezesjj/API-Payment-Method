const express = require("express");
const routes = require('./routes/index');
const app = express();
const path = require("path");
const port = 3001;
const cors = require('cors');


app.set("view engine", "ejs");
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.listen(port, () => console.log(`A api está rodando na porta ${port}`));
routes(app);
module.exports = app;