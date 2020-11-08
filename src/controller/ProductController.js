import * as Yup from 'yup';
import Product from '../model/Product';

export default {
  async get(req, res) {
    const { page = 1 } = req.query;
    const product = await Product.find()
      .limit(10)
      .skip((page - 1) * 10);
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
        return res.status(400).json({ error: 'Falha na validação dos campos' });
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
        return res.status(400).json({ error: 'Falha na validação dos campos' });
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

      if (product) {
        return res.status(200).json(product);
      }
      return res.status(400).json({ error: 'Produto não encontrado' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
  },

  async delete(req, res) {
    try {
      const produto = await Product.findByIdAndRemove(req.params.id);

      if (produto) {
        return res.status(204).json();
      }
      return res.status(400).json({ error: 'Produto não identificado' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar produto' });
    }
  }
};
