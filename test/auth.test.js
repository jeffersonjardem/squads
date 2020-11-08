import request from 'supertest';
import faker from 'faker';
import app from '../index';

describe('POST /login', () => {
  let user;
  beforeEach(async () => {
    user = {
      email: faker.name.findName(),
      password: faker.internet.password()
    };
  });

  test('Deve ser possível criar um token para um usuário', async () => {
    const credentials = {
      email: 'jeffersonjardem@gmail.com',
      password: '123456'
    };
    const res = await request(app).post('/login').send(credentials);

    expect(res.body).toHaveProperty('token');
  });

  test('Os campos de produto devem ser todos obrigatórios', async () => {
    const credentials = {
      email: 'jeffersonjardem@gmail.com'
    };
    const res = await request(app).post('/login').send(credentials);

    expect(res.statusCode).toBe(400);
  });

  test('Não deve ser possível criar um token para um usuário inexistente', async () => {
    const credentials = {
      email: 'jardemjefferson@gmail.com',
      password: '123456'
    };
    const res = await request(app).post('/login').send(credentials);

    expect(res.statusCode).toBe(400);
  });

  test('Deve ser possível criar um token para um usuário com dados inválidos', async () => {
    const res = await request(app).post('/users').send(user);
    delete user.password;

    expect(res.statusCode).toBe(400);
  });
});
