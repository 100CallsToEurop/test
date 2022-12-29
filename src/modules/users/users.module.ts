import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryRepository } from './api/queryRepository/query.repository';
import { UsersController } from './api/users.controller';
import { CreateUserUseCase } from './application/useCases/create.user.use-case';
import { DeleteUserUseCase } from './application/useCases/delete.user.use-case';
import { Profile } from './domain/entity/profile.entity';
import { User } from './domain/entity/user.entity';
import { UsersRepository } from './infrastructure/users.repository';

const useCases = [CreateUserUseCase, DeleteUserUseCase];
const adapters = [UsersRepository, QueryRepository];

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile]), CqrsModule],
  controllers: [UsersController],
  providers: [...adapters, ...useCases],
})
export class UsersModule {}
