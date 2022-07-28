import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const userObj: User = {
      name,
      email,
      admin: false,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.users.push(userObj);

    return userObj;
  }

  findById(id: string): User | undefined {

    const user = this.users.find(element => element.id === id);

    return user;

  }

  findByEmail(email: string): User | undefined {

    const emailAlreadyExists = this.users.find(element => element.email === email);

    return emailAlreadyExists;

  }

  turnAdmin(receivedUser: User): User {

    receivedUser.admin = true;

    return receivedUser;

  }

  list(): User[] {

    return this.users;

  }
}

export { UsersRepository };
