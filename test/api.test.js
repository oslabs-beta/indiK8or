import request from "supertest";

const server = 'http://localhost:4000';

describe('API Routes', () => {
  it('isLoggedIn should return a 303 status code', async () => {
    const response = await request(server).post('/login/isLoggedIn');
    console.log('Response statusCode:', response.statusCode);
    expect(response.statusCode).toBe(303);
  });
  it('signupRequest should return Username is required', async () => {
    const response = await request(server).post('/login/signupRequest');
    console.log('Response text:', response.text);
    expect(response.text).toBe('Username is required');
  })
  it('loginRequest should return a 400 status code', async () => {
    const response = await request(server).post('/login/loginRequest');
    console.log('Response statusCode:', response.statusCode);
    expect(response.statusCode).toBe(400);
  })
  it('dashboard should return a 200 status code', async () => {
    const response = await request(server).get('/dashboard');
    console.log('Response statusCode:', response.statusCode);
    expect(response.statusCode).toBe(200);
  })
})