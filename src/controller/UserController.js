import * as Yup from 'yup';
import User from '../model/User';

export default {
  async get(req, res) {
    const users = await User.find({}, { password: 0 });
    return res.status(200).json(users);
  },

  async post(req, res) {
    const userForm = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required()
    });

    if (!(await userForm.isValid(req.body))) {
      return res.status(400).json({ error: 'falha na validação dos campos' });
    }

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.status(400).json({ error: 'Usuário já existe' });
    }

    // const { name, email, password } = req.body;

    const { id, name, email } = await User.create(req.body);

    return res.status(201).json({ id, name, email });
  }
};
