import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:5001",
});

describe("/user", () => {
  it("return 201 for creating user", async () => {
    const user = await server.post("/user", {
      name: "Gabriel",
      email: "gabriel@gmail.com",
    });
    expect(user.status).toBe(201);
  });
});