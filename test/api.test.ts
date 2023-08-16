import request from "supertest";
import { Test as SupertestTest } from "supertest";
import { faker } from "@faker-js/faker";

interface testTs extends SupertestTest {
  post: (url: string) => testTs;
  get: (url: string) => testTs;
  send: (requestBody: object) => testTs;
  delete: (url: string) => testTs;
  set: (cookie: string, cookieVal: string) => testTs;
  statusCode: number;
  message: string;
  text: string;
  headers: { location: string };
  body: { userId: string };
}

const server = request("http://localhost:4000") as testTs;

// Tests for all endpoints when no input is provided to them
describe("API Routes with no inputs", () => {
  // isLoggedIn should return a 303 status code
  it("isLoggedIn should return a 303 status code", async () => {
    const response = await server.get("/login/isLoggedIn");
    expect(response.statusCode).toBe(303);
  });
  // signupRequest should return a 400 status code
  it("signupRequest should return a 400 status code", async () => {
    const response = await server.post("/login/signupRequest");
    expect(response.statusCode).toBe(400);
  });
  // loginRequest should return a 400 status code
  it("loginRequest should return a 400 status code", async () => {
    const response = await server.post("/login/loginRequest");
    expect(response.statusCode).toBe(400);
  });
  // dashshould should return a 200 status code and a JSON object
  it("dashboard should return a 200 status code and a JSON object", async () => {
    const response = await server.get("/dashboard");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });
  // logout should return a string
  it("logout should return User session not found. Unable to logout ", async () => {
    const response = await server.get("/logout");
    expect(response.text).toBe("User session not found. Unable to logout");
  });
  // request to bad endpoint should return 404 status code from catch-all
  it("request to bad enpoint should return a 404 status code", async () => {
    const response = await server.get("/noRoute");
    expect(response.statusCode).toBe(404);
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
      await server.delete(`/logout/${testUserName}`);
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
      await server.delete(`/logout/${testUserName}`);
    });
    // If user attempts to signup without firstname, lastName, or password they should receive a 400 status code
    it("should respond with a 400 status code when firstName, lastName, or password are missing", async () => {
      // declare array of inputs
      const bodyData = [
        { username: testUserName },
        { username: testUserName, firstName: "firstnameTest" },
        { username: testUserName, lastName: "lastnameTest" },
        { username: testUserName, password: "passwordTest" },
      ];
      // iterate over input array and send each one, expecting 400 response for each
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

// Tests for new user signup, login, logout, login again
describe("User should be able to signup, login, logout, and then login again", () => {
  let testUserName;
  let sessionCookie;
  // Before all tests create a fake user
  beforeAll(async () => {
    testUserName = await faker.internet.userName();
  });
  // After all tests delete fake user
  afterAll(async () => {
    await server.delete(`/logout/${testUserName}`);
  });
  // New user should be able to signup
  it("Random user should be able to signup and receive 201 status code", async () => {
    const response = await server.post("/login/signupRequest").send({
      username: testUserName,
      firstName: "firstNameTest",
      lastName: "lastNameTest",
      password: "passwordTest",
    });
    expect(response.statusCode).toBe(201);
  });
  // New user should then be able to login and receive a session cookie
  it("User should then be able to login, receive a 200 status code, and receieve a session cookie", async () => {
    const response = await server.post("/login/loginRequest").send({
      username: testUserName,
      password: "passwordTest",
    });
    expect(response.statusCode).toBe(200);
    // Get the session cookie from the login response
    sessionCookie = response.headers["set-cookie"][0].split(";")[0];
  });
  // New user should then be able to logout with provided session cookie
  it("User should then be able to logout with provided session cookie and receive a 202 status code", async () => {
    const response = await server.get("/logout").set("Cookie", sessionCookie);
    expect(response.statusCode).toBe(202);
  });
  // New user should receieve a 400 if username or password are not provided with login request
  it("User should receive 400 status code if username or password not provided with login request", async () => {
    const bodyData = [{ username: testUserName }, { password: "passwordTest" }];
    for (const body of bodyData) {
      const response = await server.post("/login/loginRequest").send(body);
      expect(response.statusCode).toBe(400);
    }
  });
  // New user should receieve a 404 if username or password are incorrect with login request
  it("New user should receieve a 404 if username or password are incorrect with login request", async () => {
    const bodyData = [
      { username: "badUsername", password: "passwordTest" },
      { username: testUserName, password: "badPassword" },
    ];
    for (const body of bodyData) {
      const response = await server.post("/login/loginRequest").send(body);
      expect(response.statusCode).toBe(404);
    }
  });
  // New user should then be able to login again when correct credentials are provided
  it("User should then be able to login again", async () => {
    const response = await server.post("/login/loginRequest").send({
      username: testUserName,
      password: "passwordTest",
    });
    expect(response.statusCode).toBe(200);
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

// GET request to pods should return us a JSON object of all pods, we should then be able to scan one of the images in this object by sending it to our scan route
describe("Pod route should return JSON object which we can send to Scan route", () => {
  let imageName;
  // Pod route should return 200 code and a JSON object of all pods
  it("Should return a 200 status code and JSON object", async () => {
    const response = await server.get("/pod");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    // extract imageName from pod response
    const firstPod = response.body[0];
    imageName = firstPod.IMAGES[0];
  });
  // Should be able to send imageName to scan route and receive a 200 code and JSON object containing grype scan result on image
  it("Sending imageName to scan should return a 200 status code and a JSON object", async () => {
    const response = await server.post("/scan").send({
      imageName: imageName,
    });
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    // pass in second arg to it/test block to allow 20 seconds for grype scan
  }, 20000);
});
