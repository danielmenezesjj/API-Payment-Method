
const customErrorHandler = (err, req, res, next) => {
    if (err.message === 'data and hash arguments required') {
      return res.status(400).json({ error: 'Erro de requisição' });
    }
  
    // Chame next() para passar o controle para o próximo middleware na cadeia
    next();
  };
  
module.exports = customErrorHandler;