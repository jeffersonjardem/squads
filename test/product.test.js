import request from 'supertest';
import faker from 'faker';
import app from '../index';

let token;

beforeAll(async (done) => {
  const user = {
    name: 'Jefferson Jardem',
    email: 'jeffersonjardem@gmail.com',
    password: '123456'
  };
  const resAddUser = await request(app).post('/users').send(user);

  const res = await request(app).post('/login').send({
    email: 'jeffersonjardem@gmail.com',
    password: '123456'
  });
  if (res.body.token) {
    token = res.body.token;
  } else {
    token = null;
  }
  done();
});

describe('GET /products', () => {
  test('Não deve ser possível listar todos os produtos sem token', async () => {
    const res = await request(app).get('/products');

    expect(res.statusCode).toBe(400);
  });

  test('Deve ser possível listar todos os produtos', async () => {
    const res = await request(app)
      .get('/products')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});

describe('GET /products/id', () => {
  test('Deve ser possível listar produto através do id', async () => {
    const resAll = await request(app)
      .get('/products')
      .set('Authorization', `Bearer ${token}`);

    const res = await request(app)
      .get(`/products/${resAll.body[0]._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});

describe('POST /products', () => {
  let product;
  beforeEach(async () => {
    product = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      value: Math.floor(Math.random() * (100000 - 1 + 1) + 1) / 100
    };
  });

  test('Deve ser possível adicionar um novo produto', async () => {
    const res = await request(app)
      .post('/products')
      .send(product)
      .set('Authorization', `Bearer ${token}`);

    expect(res.body).toMatchObject({
      ...product
    });
  });

  test('O statuscode de um produto criado deverá ser 201', async () => {
    const res = await request(app)
      .post('/products')
      .send(product)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(201);
  });

  test('Os campos de produto devem ser todos obrigatórios', async () => {
    delete product.value;
    const res = await request(app)
      .post('/products')
      .send(product)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(400);
  });
});

describe('PUT /products/id', () => {
  test('Deve ser possível atualizar dados de um produto', async () => {
    const res = await request(app)
      .get('/products')
      .set('Authorization', `Bearer ${token}`);

    const updateProduct = {
      name: res.body[0].name,
      description: 'uma descricao qualquer para o PUT',
      value: 1000
    };

    const resUpdate = await request(app)
      .put(`/products/${res.body[0]._id}`)
      .send(updateProduct)
      .set('Authorization', `Bearer ${token}`);

    expect(resUpdate.body).toMatchObject(updateProduct);
  });

  test('Não deve ser possível atualizar um produto inexistente', async () => {
    const res = await request(app)
      .put('/products/19812357fsdh')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(400);
  });
});

describe('DELETE /products/id', () => {
  test('Deve ser possível deletar um produto', async () => {
    const resAll = await request(app)
      .get('/products')
      .set('Authorization', `Bearer ${token}`);

    const res = await request(app)
      .delete(`/products/${resAll.body[0]._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });

  test('Não deve ser possível deletar um produto inexistente', async () => {
    const res = await request(app)
      .put('/products/19812357fsdh')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(400);
  });
});
