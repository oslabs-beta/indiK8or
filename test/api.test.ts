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
  it('logout should return User session not found. Unable to logout ', async() => {
    const response = await request(server).post('/logout');
    console.log('Response text:', response.text);
    expect(response.text).toBe('User session not found. Unable to logout');
  })
})

describe('OAuth Routes', () => {
  it('Github oAuth should return a 302 status code and redirect to GitHub login', async () => {
    const response = await request(server).get('/auth/github');
    // 302 is a redirect code
    expect(response.statusCode).toBe(302);
    console.log('Response statusCode', response.statusCode);
    // the headers location is where github should redirect, and it should redirect to githubs OAuth
    expect(response.headers.location).toMatch(/^https:\/\/github.com\/login\/oauth\/authorize\?/);
    console.log('Response headers location', response.headers.location);
  });
  it('Github callback should return a 302 status code and redirect to Github login', async () => {
    const response = await request(server).get('/auth/github/callback');
    // 302 is a redirect code
    expect(response.statusCode).toBe(302);
    console.log('Response statusCode', response.statusCode);
    // the headers location is where github should redirect, and it should redirect to githubs OAuth
    expect(response.headers.location).toMatch(/^https:\/\/github.com\/login\/oauth\/authorize\?/);
    console.log('Response headers location', response.headers.location);
  });
  it('Github oAuth error should return a 500 status code', async() => {
    const response = await request(server).get('/auth/error');
    console.log('Response statusCode', response.statusCode);
    expect(response.statusCode).toBe(500);
  })
})