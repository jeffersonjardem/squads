import * as Yup from 'yup';
import User from '../model/User';

export default {
  async get(req, res) {
    const { page = 1 } = req.query;
    const users = await User.find(
      {},
      { password: 0 },
      { skip: (page - 1) * 10, limit: 10 }
    );
    return res.status(200).json(users);
  },

  async post(req, res) {
    const userForm = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required()
    });

    if (!(await userForm.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.status(201).json({ id, name, email });
  }
};
