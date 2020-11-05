import * as Yup from 'yup';
import Product from '../model/Product';

export default {
  async get(req, res) {
    const product = await Product.find();
    return res.status(200).json(product);
  },

  async getById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar produto' });
    }
  },

  async post(req, res) {
    try {
      const productForm = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().required(),
        value: Yup.number().required()
      });

      if (!(await productForm.isValid(req.body))) {
        return res.status(401).json({ error: 'falha na validação dos campos' });
      }

      const { name, description, value } = req.body;
      const product = await Product.create({
        name,
        description,
        value
      });

      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao salvar produto' });
    }
  },

  async put(req, res) {
    try {
      const productForm = Yup.object().shape({
        name: Yup.string(),
        description: Yup.string(),
        value: Yup.number()
      });

      if (!(await productForm.isValid(req.body))) {
        return res.status(401).json({ error: 'falha na validação dos campos' });
      }

      const { name, description, value } = req.body;

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          description,
          value
        },
        { new: true }
      );

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
  },

  async delete(req, res) {
    try {
      await Product.findByIdAndRemove(req.params.id);

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar produto' });
    }
  }
};
