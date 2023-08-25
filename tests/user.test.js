

const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');

describe('User API tests', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://api_test:api_test@cluster0.rcj7wxp.mongodb.net/myDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ username: 'testuser', email: 'test@example.com' });

    expect(response.status).toBe(201);
    expect(response.body.username).toBe('testuser');


  });

  it('should update an existing user', async () => {
    const createdUser = await User.create({ username: 'olduser', email: 'old@example.com' });

    const response = await request(app)
      .put(`/api/users/${createdUser._id}`)
      .send({ username: 'newuser', email: 'new@example.com' });

    expect(response.status).toBe(200);
    expect(response.body.username).toBe('newuser');

  });

  it('should get a list of users', async () => {
    await User.create({ username: 'user1', email: 'user1@example.com' });
    await User.create({ username: 'user2', email: 'user2@example.com' });

    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].username).toBe('user1');
    expect(response.body[1].username).toBe('user2');
  });
});