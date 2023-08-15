import request from "supertest";
import { Test as SupertestTest } from "supertest";
import { User } from "../server/models/userModel";
import { faker } from "@faker-js/faker";

interface testTs extends SupertestTest {
  post: (url: string) => testTs;
  get: (url: string) => testTs;
  send: (requestBody: object) => testTs;
  statusCode: number;
  message: string;
  text: string;
  headers: { location: string };
  body: { userId: string };
}

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
  let testUserName;
  beforeEach(async () => {
    testUserName = await faker.internet.userName();
  });

  afterEach(async () => {
    // try {
    //   await User.findOneAndDelete({ username: testUserName });
    // } catch (err) {
    //   console.log(`Error deleteing ${err}`);
    // }
  });
  describe("given a username, firstName, lastName, and password", () => {
    it("should respond with a 201 status code", async () => {
      const response = await server.post("/login/signupRequest").send({
        username: testUserName,
        firstName: "firstNameTest",
        lastName: "lastNameTest",
        password: "passwordTest",
      });
      expect(response.statusCode).toBe(201);
    });
    it("should specify json in the content type header", async () => {
      const response = await server.post("/login/signupRequest").send({
        username: testUserName,
        firstName: "firstNameTest",
        lastName: "lastNameTest",
        password: "passwordTest",
      });
      expect(response.headers["content-type"]).toMatch(/application\/json/);
    });
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

  describe("when firstname, lastname, or password are missing", () => {
    let testUserName;
    beforeEach(async () => {
      testUserName = faker.internet.userName();
    });

    afterEach(async () => {
      // try {
      //   await User.findOneAndDelete({ username: testUserName });
      // } catch (err) {
      //   console.log(`Error deleteing ${err}`);
      // }
    });
    it("should respond with a 400 status code", async () => {
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
