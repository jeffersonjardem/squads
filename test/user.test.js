import request from 'supertest';
import faker from 'faker';
import app from '../index';

let token;

beforeAll(async (done) => {
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

describe('GET /users', () => {
  test('Deve ser possível listar todos os usuários', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

describe('POST /users', () => {
  let user;
  beforeEach(async () => {
    user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
  });

  test('Deve ser possível adicionar um novo usuário', async () => {
    const res = await request(app).post('/users').send(user);
    delete user.password;
    expect(res.body).toMatchObject({
      ...user
    });
  });

  test('O statuscode de um usuário criado deverá ser 201', async () => {
    const res = await request(app).post('/users').send(user);

    expect(res.statusCode).toBe(201);
  });

  test('Não deve ser possível adicionar dois usuário com o mesmo email', async () => {
    const usr = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    const resUnique = await request(app).post('/users').send(usr);
    const resDuplicated = await request(app).post('/users').send(usr);

    expect(resDuplicated.statusCode).toBe(400);
  });

  test('Os campos de usuário devem ser todos obrigatórios', async () => {
    const usr = {
      email: faker.name.findName(),
      password: faker.internet.password()
    };
    const res = await request(app).post('/users').send(usr);
    expect(res.statusCode).toBe(400);
  });

  test('Não deve retornar o password na criação do usuário', async () => {
    const res = await request(app).post('/users').send(user);

    expect(!res.body.password).toBe(true);
  });
});
