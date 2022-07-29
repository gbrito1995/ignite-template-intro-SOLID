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
    const userObj = new User();

    Object.assign(userObj, {
      name,
      email,
      admin: false,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const length = this.users.push(userObj);

    return this.users[length - 1];
  }

  findById(id: string): User | undefined {
    const user = this.users.find((element) => element.id === id);

    return user;
  }

  findByEmail(email: string): User | undefined {
    const emailAlreadyExists = this.users.find(
      (element) => element.email === email
    );

    return emailAlreadyExists;
  }

  turnAdmin(receivedUser: User): User {
    const indexOFUser = this.users.findIndex(
      (element) => element.id === receivedUser.id
    );

    this.users[indexOFUser].admin = true;

    return receivedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
