import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { ProfileInputModel } from '../../api/models/profile.model';
import { User } from './user.entity';

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public userId: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public patronymicName: string;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public user: User;

  constructor(profile?: ProfileInputModel) {
    super();
    if (profile) {
      this.firstName = profile.firstName;
      this.lastName = profile.lastName;
      this.patronymicName = profile.patronymicName;
    }
  }

  public setFirstName(firstName: string): void {
    this.firstName = firstName;
  }
  public setLastName(lastName: string): void {
    this.lastName = lastName;
  }
  public setPatronymicName(patronymicName: string): void {
    this.patronymicName = patronymicName;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public setProfile(userId: string, profile: ProfileInputModel) {
    this.userId = userId;
    this.setFirstName(profile.firstName);
    this.setLastName(profile.lastName);
    this.setPatronymicName(profile.patronymicName);
  }
}
