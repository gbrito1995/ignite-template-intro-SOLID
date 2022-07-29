import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  execute({ user_id }: IRequest): User {
    const userReceived = this.usersRepository.findById(user_id);

    if (!userReceived) {
      throw new Error("User does not exits!");
    }

    const userAdmin = this.usersRepository.turnAdmin(userReceived);

    return userAdmin;
  }
}

export { TurnUserAdminUseCase };
