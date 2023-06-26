const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "teste");
    req.usuario = decode;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        mensagem:
          "Ops! Parece que você não está logado. Por favor, faça o login para gerar o seu QR code.",
      });
  }
};
