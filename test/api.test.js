import request from "supertest";

const server = 'http://localhost:4000';

describe('API Routes', () => {
  it('isLoggedIn should return a 303 status code', async () => {
    const response = await request(server).post('/login/isLoggedIn');
    console.log('Response statusCode:', response.statusCode);
    expect(response.statusCode).toBe(303);
  });
  it('signupRequest should return a 500 status code', async () => {
    const response = await request(server).post('/login/signupRequest');
    console.log('Response statusCode:', response.statusCode);
    expect(response.statusCode).toBe(500);
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
  it('logout should return ', async() => {
    const response = await request(server).post('/logout');
    console.log('Response text:', response.text);
    expect(response.text).toBe('User session not found. Unable to logout');
  })
})