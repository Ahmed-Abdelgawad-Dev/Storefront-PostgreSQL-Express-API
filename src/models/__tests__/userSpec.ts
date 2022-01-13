import { UserModel } from '../user';
import { User } from '../../types';
import client from '../../database';
import dotenv from 'dotenv';
import _ from 'lodash';
import bcrypt from 'bcrypt';

dotenv.config();
const { SALT_ROUNDS, PEPPER } = process.env;

const userInstance = new UserModel();
// Dummy user list
const usrList: User[] = [
  {
    user_name: 'testuser1',
    first_name: 'Freddie',
    last_name: 'Mercury',
    password: 'testpwd1'
  },
  {
    user_name: 'testuser2',
    first_name: 'Brian',
    last_name: 'May',
    password: 'testpwd2'
  },
  {
    user_name: 'testuser3',
    first_name: 'John',
    last_name: 'Deacon',
    password: 'testpwd3'
  }
];

// Adding ids for simplicity.
const uListWithIdsPasswords = usrList.map((u, index) => {
  return {
    id: index + 1,
    ..._.pick(u, ['user_name', 'first_name', 'last_name'])
  };
});

describe('User Instance', () => {
  describe('Testing user instance methods existence:', () => {
    it('Index method defined', function () {
      expect(userInstance.index).toBeDefined();
    });
    it('Create method defined', function () {
      expect(userInstance.create).toBeDefined();
    });
    it('Show method defined', function () {
      expect(userInstance.show).toBeDefined();
    });
    it('Update method defined', function () {
      expect(userInstance.update).toBeDefined();
    });
    it('Destroy method defined', function () {
      expect(userInstance.destroy).toBeDefined();
    });
    // it('Authenticate method defined', function () {
    //   expect(userInstance.authenticate).toBeDefined();
    // });
  });

  describe('Testing user instance method functionalities:', () => {
    beforeAll(async () => {
      const connection = await client.connect();
      for (const usr of usrList) {
        const encryptedPassword = bcrypt.hashSync(
          usr.password + PEPPER,
          parseInt(SALT_ROUNDS as unknown as string)
        );
        await connection.query(
          'insert into users (user_name, first_name, last_name, password) values ($1,$2,$3,$4);',
          [usr.user_name, usr.first_name, usr.last_name, encryptedPassword]
        );
      }
      connection.release();
    });

    it('Index: retrieved all users.', async () => {
      const result = await userInstance.index();
      const resultWithoutPwd = result.map((u) => {
        return _.pick(u, ['id', 'user_name', 'first_name', 'last_name']);
      });
      const pwdChecks = result.every((user: User, i: number) => {
        return bcrypt.compareSync(usrList[i].password + PEPPER, user.password);
      });

      expect(resultWithoutPwd).toEqual(uListWithIdsPasswords);
      expect(pwdChecks).toBe(true);
    });

    it('Create: Creates a user.', async () => {
      const created = await userInstance.create({
        user_name: 'ahmed4',
        first_name: 'ahmed4',
        last_name: 'ahmed4',
        password: 'ahmed4'
      });
      const withoutPassword = _.pick(created, [
        'id',
        'user_name',
        'first_name',
        'last_name'
      ]);
      const check = bcrypt.compareSync('ahmed4' + PEPPER, created.password);
      expect(check).toBe(true);
      expect(withoutPassword).toEqual({
        id: 4,
        user_name: 'ahmed4',
        first_name: 'ahmed4',
        last_name: 'ahmed4'
      });
    });
    it('Show: shows a specific user with its id.', async () => {
      const usrId = await userInstance.show(4);
      const withoutPassword = _.pick(usrId, [
        'id',
        'user_name',
        'first_name',
        'last_name'
      ]);
      const pwdCheck = bcrypt.compareSync('ahmed4' + PEPPER, usrId.password);

      expect(pwdCheck).toBe(true);
      expect(withoutPassword).toEqual({
        id: 4,
        user_name: 'ahmed4',
        first_name: 'ahmed4',
        last_name: 'ahmed4'
      });
    });
  });

  afterAll(async () => {
    const connection = await client.connect();
    await connection.query(
      'delete from users; \nalter sequence users_id_seq restart with 1;'
    );
    connection.release();
  });
});