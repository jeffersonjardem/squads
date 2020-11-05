import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../model/User';

export default {
  async post(req, res) {
    const authForm = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    });

    if (!(await authForm.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ error: 'Usuário não encontrado' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }

    const { _id, name } = user;

    return res.json({
      user: {
        _id,
        name,
        email
      },
      token: jwt.sign({ _id }, `${process.env.SECRET_TOKEN}`, {
        expiresIn: '2d'
      })
    });
  }
};
