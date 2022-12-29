import { CommandHandler, ICommandHandler } from "@nestjs/cqrs/dist";
import { UsersRepository } from "../../infrastructure/users.repository";


export class DeleteUserCommand {
  constructor(public userId: string){}
}

@CommandHandler(DeleteUserCommand)
export class DeleteUserUseCase implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly usersRepositorty: UsersRepository) {}

  async execute(command: DeleteUserCommand) {
    const {userId} = command
    await this.usersRepositorty.deleteUserByid(userId);
  }
}
