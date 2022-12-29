import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entity/user.entity';
import { UserViewModel, UserViewModelWithoutEmail } from './dto/user.dto';

@Injectable()
export class QueryRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  private buildResponseUser(user: User): UserViewModel {
    const profile = user.profile;
    return {
      email: user.getEmail(),
      firstName: profile.firstName,
      lastName: profile.lastName,
      patronymicName: profile.patronymicName,
    };
  }

  private  buildResponseUserWithoutEmail(user: User): UserViewModelWithoutEmail {
    const profile = user.profile;
    return {
      firstName: profile.firstName,
      lastName: profile.lastName,
      patronymicName: profile.patronymicName,
    };
  }

  async findUserById(userId: string): Promise<UserViewModel> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });

    return this.buildResponseUser(user);
  }

  async findUserByIdWithoutEmail(
    userId: string,
  ): Promise<UserViewModelWithoutEmail> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });

    return this.buildResponseUserWithoutEmail(user);
  }
}
