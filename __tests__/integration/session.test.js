const request = require('supertest');
// arquivo que declara o express
const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Authentication', () => {
  // executa antes de cada teste desse describe
  beforeEach(async () => {
    await truncate();
  });

  // it: nome do teste tem que ser exatamente o que o teste faz
  it('should sum two numbers', () => {
    const x = 2;
    const y = 4;

    const sum = x + y;

    // espero que soma seja 6
    expect(sum).toBe(6);
  });

  it('should create a user', async () => {
    const user = await factory.create('User', {
      email: 'izabella@gmail.com.br'
    });

    expect(user.email).toBe('izabella@gmail.com.br');
  });

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123456'
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      });

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '123456'
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '6748930'
      });

    expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticate', async () => {
    const user = await factory.create('User', {
      password: '123456'
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      });

    expect(response.body).toHaveProperty('token');
  });

  it('shoud be able to access private routes when authenticate', async () => {
    const user = await factory.create('User', {
      password: '123456'
    });

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to access privaye routes without jwt token', async () => {
    const user = await factory.create('User', {
      password: '123456'
    });

    const response = await request(app).get('/dashboard');

    expect(response.status).toBe(401);
  });

  it('it not should be able to access private routes with invalid jwt token', async () => {
    const user = await factory.create('User', {
      password: '123456'
    });

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', 'Bearer 64738904');

    expect(response.status).toBe(401);
  });
});
