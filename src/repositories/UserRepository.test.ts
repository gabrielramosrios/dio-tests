import { UserRepository } from "./UserRepository";
import getEntityManagerMock from "../__mocks__/getEntityManagerMock";
import { User } from "../entities/User";
import { getMockUser } from "../__mocks__/mockUser";

describe("UserRepository", () => {
  const mockUser: User = getMockUser()
  it("retornar usuario salvo, quando chamar funcao save", async () => {
    const managerMock = await getEntityManagerMock({
      saveReturn: mockUser,
    });
    const useRespository = new UserRepository(managerMock);
    const user = await useRespository.save(mockUser);
    expect(user).toHaveProperty("user_id");
    expect(user).toMatchObject({
      name: 'Gabriel',
      email: "gabriel@email.com"
    });
  });
});