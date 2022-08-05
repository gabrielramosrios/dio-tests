import { getMockUser } from "./../__mocks__/mockUser";
import { User } from "./../entities/User";
import { UserController } from "./UserController";
import { makeMockResponse } from "../__mocks__/mockResponse";
import { Request } from "express";

const mockUser: User = getMockUser();

let returnCreateUser;

jest.mock("../services/UserService", () => {
  return {
    UserService: jest.fn().mockImplementation(() => {
      return {
        createUser: returnCreateUser,
      };
    }),
  };
});
describe("UserController", () => {
  const userController = new UserController();
  const mockResponse = makeMockResponse();
  const mockRequest = {
    body: {
      name: "Gabriel",
      email: "gabriel@email.com",
    },
  } as Request;

  it("Deve retornar status 201 e o usuário criado", async () => {
    returnCreateUser = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockUser));
    await userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(201);
    expect(mockResponse.state.json).toHaveProperty("user_id");
    expect(mockResponse.state.json).toMatchObject({
      name: "Gabriel",
      email: "gabriel@email.com",
    });
  });

  it("Deve retornar status 500, quando correr um erro", async () => {
    returnCreateUser = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    await userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(500);
  });

  it("if name empty", async () => {
    const mockRequest = {
      body: {
        name: "",
        email: "",
      },
    } as Request;
    await userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(400);
  });
});