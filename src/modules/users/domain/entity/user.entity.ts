import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfileInputModel } from "../../api/models/profile.model";
import { UserInputModel } from "../../api/models/user.model";
import { Profile } from "./profile.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true })
  public email: string;

  @Column({ nullable: true })
  public password: string;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
  })
  public profile: Profile;

  constructor(user?: UserInputModel) {
    super();
    if (user) {
      this.email = user.email;
      this.password = user.password;
      this.profile = new Profile();
    }
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public getEmail(): string {
    return this.email;
  }
  public getPassword(): string {
    return this.password;
  }

  public createProfile(profile: ProfileInputModel) {
    this.profile.setProfile(this.id, profile);
    return this.profile;
  }
}
