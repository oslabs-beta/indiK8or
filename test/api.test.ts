import request from "supertest";
import { Test as SupertestTest } from "supertest";

interface testTs extends SupertestTest {
  post: (url: string) => testTs;
  get: (url: string) => testTs;
  statusCode: number;
  text: string;
  headers: { location: string };
}

const server = request("http://localhost:4000") as testTs;

describe("API Routes", () => {
  it("isLoggedIn should return a 303 status code", async () => {
    const response = await server.get("/login/isLoggedIn");
    expect(response.statusCode).toBe(303);
  });
  it("signupRequest should return a 500 status code", async () => {
    const response = await server.post("/login/signupRequest");
    expect(response.statusCode).toBe(500);
  });
  it("loginRequest should return a 400 status code", async () => {
    const response = await server.post("/login/loginRequest");
    expect(response.statusCode).toBe(400);
  });
  it("dashboard should return a 200 status code", async () => {
    const response = await server.get("/dashboard");
    expect(response.statusCode).toBe(200);
  });
  it("logout should return User session not found. Unable to logout ", async () => {
    const response = await server.get("/logout");
    expect(response.text).toBe("User session not found. Unable to logout");
  });
});

describe("OAuth Routes", () => {
  it("Github oAuth should return a 302 status code and redirect to GitHub login", async () => {
    const response = await server.get("/auth/github");
    // 302 is a redirect code
    expect(response.statusCode).toBe(302);
    // the headers location is where github should redirect, and it should redirect to githubs OAuth
    expect(response.headers.location).toMatch(
      /^https:\/\/github.com\/login\/oauth\/authorize\?/,
    );
  });
  it("Github callback should return a 302 status code and redirect to Github login", async () => {
    const response = await server.get("/auth/github/callback");
    // 302 is a redirect code
    expect(response.statusCode).toBe(302);
    // the headers location is where github should redirect, and it should redirect to githubs OAuth
    expect(response.headers.location).toMatch(
      /^https:\/\/github.com\/login\/oauth\/authorize\?/,
    );
  });
  it("Github oAuth error should return a 500 status code", async () => {
    const response = await server.get("/auth/error");
    expect(response.statusCode).toBe(500);
  });
});
