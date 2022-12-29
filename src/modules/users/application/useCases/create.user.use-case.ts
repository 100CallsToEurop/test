import { CommandHandler, ICommandHandler } from "@nestjs/cqrs/dist";
import { ProfileInputModel } from "../../api/models/profile.model";
import { UserInputModel } from "../../api/models/user.model";
import { User } from "../../domain/entity/user.entity";
import { UsersRepository } from "../../infrastructure/users.repository";


export class CreateUserCommand {
  constructor(public usersParams: UserInputModel) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserUseCase implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly usersRepositorty: UsersRepository) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const { usersParams } = command
    const newUser = new User(usersParams);
    const profileParams: ProfileInputModel = {
      firstName: 'Артур',
      lastName: 'Сергеевич',
      patronymicName: 'Пирожков',
    };
    newUser.createProfile(profileParams);
    await this.usersRepositorty.save(newUser);
    return newUser;
  }
}