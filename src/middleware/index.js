import jwt from 'jsonwebtoken';

export default {
  async checkToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(400).json({ error: 'Token não informado' });
    }
    const token = authHeader.slice(7, authHeader.length);

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'Token inválido'
        });
      }
      req.decoded = decoded;
      next();
    });
  }
};
