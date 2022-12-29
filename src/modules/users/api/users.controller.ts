import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs/dist';
import { CreateUserCommand } from '../application/useCases/create.user.use-case';
import { DeleteUserCommand } from '../application/useCases/delete.user.use-case';
import { UserInputModel } from './models/user.model';
import { QueryRepository } from './queryRepository/query.repository';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryRepository: QueryRepository,
  ) {}

  @Post()
  async createUser(@Body() usersParams: UserInputModel) {
    const user = await this.commandBus.execute(
      new CreateUserCommand(usersParams),
    );
    return await this.queryRepository.findUserByIdWithoutEmail(user.id);
  }

  @Get(':id')
  async getUser(@Param('id') userId: string) {
    return await this.queryRepository.findUserById(userId);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    await this.commandBus.execute(new DeleteUserCommand(userId));
  }
}
