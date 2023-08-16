import request from "supertest";
import { Test as SupertestTest } from "supertest";
import { faker } from "@faker-js/faker";

interface testTs extends SupertestTest {
  post: (url: string) => testTs;
  get: (url: string) => testTs;
  send: (requestBody: object) => testTs;
  delete: (url: string) => testTs;
  statusCode: number;
  message: string;
  text: string;
  headers: { location: string };
  body: { userId: string };
}

const server = request("http://localhost:4000") as testTs;

// Tests for all endpoints when no input is provided to them
describe("API Routes with no inputs", () => {
  it("isLoggedIn should return a 303 status code", async () => {
    const response = await server.get("/login/isLoggedIn");
    expect(response.statusCode).toBe(303);
  });
  it("signupRequest should return a 400 status code", async () => {
    const response = await server.post("/login/signupRequest");
    expect(response.statusCode).toBe(400);
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

// Tests for signup
describe("Signup Routes", () => {
  let testUserName;
  // If giving all 4 correct credentials
  describe("given a username, firstName, lastName, and password", () => {
    // before each test, create fake username
    beforeEach(async () => {
      testUserName = await faker.internet.userName();
    });
    // after each test, delete fake user
    afterEach(async () => {
      await server.delete("/logout").send({
        username: testUserName,
      });
    });
    // User should be created and we should receive a 201 status code
    it("should respond with a 201 status code", async () => {
      const response = await server.post("/login/signupRequest").send({
        username: testUserName,
        firstName: "firstNameTest",
        lastName: "lastNameTest",
        password: "passwordTest",
      });
      expect(response.statusCode).toBe(201);
    });
    // User should be created and we should receive a JSON response
    it("should specify json in the content type header", async () => {
      const response = await server.post("/login/signupRequest").send({
        username: testUserName,
        firstName: "firstNameTest",
        lastName: "lastNameTest",
        password: "passwordTest",
      });
      expect(response.headers["content-type"]).toMatch(/application\/json/);
    });
    // User should be created and we should receive userId for that new user
    it("response should have userId", async () => {
      const response = await server.post("/login/signupRequest").send({
        username: testUserName,
        firstName: "firstNameTest",
        lastName: "lastNameTest",
        password: "passwordTest",
      });
      expect(response.body.userId).toBeDefined();
    });
  });
  // If signup is attempted without all 4 required fields
  describe("when input fields are missing", () => {
    let testUserName;
    // Before each test, create a fake username
    beforeEach(async () => {
      testUserName = await faker.internet.userName();
    });
    // After each test, delete fake user
    afterEach(async () => {
      await server.delete("/logout").send({
        username: testUserName,
      });
    });
    // If user attempts to signup without firstname, lastName, or password they should receive a 400 status code
    it("should respond with a 400 status code when firstName, lastName, or password are missing", async () => {
      const bodyData = [
        { username: testUserName },
        { username: testUserName, firstName: "firstnameTest" },
        { username: testUserName, lastName: "lastnameTest" },
        { username: testUserName, password: "passwordTest" },
      ];
      for (const body of bodyData) {
        const response = await server.post("/login/signupRequest").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
    // If user attemps to signup without a username, this should trigger our verifyUser method to return a 409 status code
    it("should respond with a 409 status code when username is missing", async () => {
      const response = await server.post("/login/signupRequest").send({
        firstName: "firstnameTest",
        lastName: "lastnameTest",
        password: "passwordTest",
      });
      expect(response.statusCode).toBe(400);
    });
  });
});

describe("OAuth Routes", () => {
  it("Github oAuth should return a 302 status code and redirect to GitHub login", async () => {
    const response = await server.get("/auth/github");
    // 302 means Gituser was found
    expect(response.statusCode).toBe(302);
    // the headers location is where github should redirect, and it should redirect to githubs OAuth
    expect(response.headers.location).toMatch(
      /^https:\/\/github.com\/login\/oauth\/authorize\?/,
    );
  });
  it("Github callback should return a 302 status code and redirect to Github login", async () => {
    const response = await server.get("/auth/github/callback");
    // 302 means Gituser was found
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
