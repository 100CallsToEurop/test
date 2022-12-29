import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/entity/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async save(model: User): Promise<User> {
    return await model.save();
  }

  async findUserById(userId: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });
  }

  async deleteUserByid(userId: string) {
    await this.usersRepository.delete({ id: userId });
  }
}
