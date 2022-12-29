import { ProfileInputModel } from "../api/models/profile.model";
import { UserInputModel } from "../api/models/user.model";
import { User } from "../domain/entity/user.entity";

describe('UsersService', () => {
 

  it('create user', ()=>{
    const userParams: UserInputModel = {
      email: 'test1@mail.ru',
      password: '12345',
    };
    const userProfileParams: ProfileInputModel = {
      firstName: 'Петр',
      lastName: 'Петров',
      patronymicName: 'Петрович',
    };
     const newUser = new User(userParams);
     const profile = newUser.createProfile(userProfileParams);
     expect(profile).toEqual(newUser.profile);
     profile.setLastName('Иванов');
     expect(profile.getLastName()).toBe('Иванов');
  })

  it('set profile new namme', ()=>{
    const userParams: UserInputModel = {
      email: 'test1@mail.ru',
      password: '12345',
    };
    const userProfileParams: ProfileInputModel = {
      firstName: 'Петр',
      lastName: 'Петров',
      patronymicName: 'Петрович',
    };
    const newName = 'Александр'
     const newUser = new User(userParams);
     const profile = newUser.createProfile(userProfileParams);
     profile.setFirstName(newName);
     expect(profile.getFirstName()).toBe('Алексей');
  })


  
});
