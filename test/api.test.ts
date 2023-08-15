import request from "supertest";
import { Test as SupertestTest } from "supertest";
import { jest } from "@jest/globals";

interface testTs extends SupertestTest {
  post: (url: string) => testTs;
  get: (url: string) => testTs;
  send: (requestBody: object) => testTs;
  statusCode: number;
  text: string;
  headers: { location: string };
  body: { userId: string };
}

const createUser = jest.fn();
const getUser = jest.fn();

const server = request("http://localhost:4000") as testTs;

describe("API Routes", () => {
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

describe("Login Routes", () => {
  beforeEach(() => {
    createUser.mockReset();
    createUser.mockResolvedValue(0);
  });
  describe("given a username and password", () => {
    it("should save the username and password to the database", async () => {
      const bodyData = [
        {
          username: "username1",
          firstName: "firstname",
          lastName: "lastname",
          password: "password",
        },
        {
          username: "username2",
          firstName: "firstname",
          lastName: "lastname",
          password: "password",
        },
        {
          username: "username3",
          firstName: "firstname",
          lastName: "lastname",
          password: "password",
        },
      ];
      for (const body of bodyData) {
        await server.post("/login/signupRequest").send(body);
        expect(createUser.mock.calls.length).toBe(1);
        expect(createUser.mock.calls[0][0]).toBe(body.username);
        expect(createUser.mock.calls[0][1]).toBe(body.firstName);
        expect(createUser.mock.calls[0][2]).toBe(body.lastName);
        expect(createUser.mock.calls[0][3]).toBe(body.password);
      }
    });
    // should respond with a json object containing the user id
    it("should respond with a 201 status code", async () => {
      const response = await server.post("/login/signupRequest").send({
        username: "username1",
        firstName: "firstName",
        lastName: "lastName",
        password: "password",
      });
      expect(response.statusCode).toBe(201);
    });
    it("should specify json in the content type header", async () => {
      const response = await server.post("/login/signupRequest").send({
        username: "username7",
        firstName: "firstName",
        lastName: "lastName",
        password: "password",
      });
      expect(response.headers["content-type"]).toMatch(/application\/json/);
    });
    it("response should have userId", async () => {
      const response = await server.post("/login/signupRequest").send({
        username: "username6",
        firstName: "firstName",
        lastName: "lastName",
        password: "password",
      });
      expect(response.body.userId).toBeDefined();
    });
  });

  describe("when username, firstname, lastname, or password are missing", () => {
    // should respond with a status code of 400
    it("should respond with a 400 status code", async () => {
      const bodyData = [
        { username: "username" },
        { firstName: "firstname" },
        { lastName: "lastname" },
        { password: "password" },
        {},
      ];
      for (const body of bodyData) {
        const response = await server.post("/login/signupRequest").send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("err");
      }
    });
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
