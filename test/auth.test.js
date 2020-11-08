import request from 'supertest';
import faker from 'faker';
import app from '../index';

beforeAll(async () => {
  const user = {
    name: 'Jefferson Jardem',
    email: 'jeffersonjardem@gmail.com',
    password: '123456'
  };
  await request(app).post('/users').send(user);
});

describe('POST /login', () => {
  const credentials = {
    email: 'jeffersonjardem@gmail.com',
    password: '123456'
  };

  let user;
  beforeEach(async () => {
    user = {
      email: faker.name.findName(),
      password: faker.internet.password()
    };
  });

  test('Deve ser possível criar um token para um usuário', async () => {
    const res = await request(app).post('/login').send(credentials);
    expect(res.body).toHaveProperty('token');
  });

  test('Os campos de produto devem ser todos obrigatórios', async () => {
    delete credentials.password;
    const res = await request(app).post('/login').send(credentials);

    expect(res.statusCode).toBe(400);
  });

  test('Não deve ser possível criar um token para um usuário inexistente', async () => {
    const fakeCredentials = {
      email: 'jardem@gmail.com',
      password: '123456'
    };
    const res = await request(app).post('/login').send(fakeCredentials);

    expect(res.statusCode).toBe(400);
  });

  test('Deve ser possível criar um token para um usuário com dados inválidos', async () => {
    const res = await request(app).post('/users').send(user);
    delete user.password;

    expect(res.statusCode).toBe(400);
  });
});
