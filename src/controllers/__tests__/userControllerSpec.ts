import client from '../../database'
import {UserModel} from "../../models/user";
import supertest from "supertest";
import {app} from '../../server'
import {User} from '../../types'
import {usrList, uListWithIdsPasswords} from "../../models/__tests__/userSpec";
import _ from 'lodash'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import {createToken, verifyToken} from "../../utils/jwtAuth";
import {stringify} from "querystring";
dotenv.config()

const usrModel = new UserModel()
const request = supertest(app);

// let token = createToken('testToken')
let token = createToken(stringify(usrList[0]))
describe('Testing API ENDPOINTS ',()=> {
    describe('Users controller', () => {

        it("'/users/create': creates a user and returns a token", async () => {
        const resp = await request.post('/users/create')
            .set('Authorization', `Bearer ${token}`)
            .send(usrList[0]);
        expect(resp.status).toBe(200);
        expect(resp.body).toBeInstanceOf(String);
        // Stackoverflow
        expect(resp.body).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
      })

      it("'/users': returns all users with encrypted passwords", async () => {
        const response = await request
          .get('/users')
          .set('Authorization', `Bearer ${token}`);
        const usrs = response.body.map((user: User) => {
          return _.pick(user, ['id', 'user_name', 'first_name', 'last_name']);
        });
        const chPw = response.body.every((user: User, i: number) => {
            // console.log('TOKEN ===>>>\n',token)
            // console.log()
            // console.log('TOKEN CONFIRMED:===>>>\n',bcrypt.compareSync(usrList[i].password + process.env.PEPPER, user.password))
          return bcrypt.compareSync(usrList[i].password + process.env.PEPPER, user.password);
        });

        expect(response.status).toBe(200);
        expect(usrs).toEqual([uListWithIdsPasswords[0]]);
        expect(chPw).toBe(true);
      });

      it('gets /users/:id: returns a specific user', async () => {
        const response = await request
          .get('/users/1')
          .set('Authorization', `Bearer ${token}`);
        const pwdCheck = bcrypt.compareSync(
          usrList[0].password + process.env.PEPPER,
          response.body.password
        );
        type customList = { id: string, user_name:  string, first_name: string, last_name: string }
        expect(response.status).toBe(200);
        expect(pwdCheck).toBe(true);
        expect(
          _.pick(response.body, ['id', 'user_name', 'first_name', 'last_name'])
        ).toEqual(uListWithIdsPasswords[0] as unknown as customList);
      });


    })
    describe('API ENDPOINTS Existence', () => {
        it('Create method defined in controllers',  () =>{
          expect(usrModel.create).toBeDefined();
        });
        it('Index method defined in controllers',  ()=> {
          expect(usrModel.index).toBeDefined();
        });
        it('Show method defined in controllers',  () => {
          expect(usrModel.show).toBeDefined();
        });
        it('Update method defined in controllers', ()=> {
          expect(usrModel.update).toBeDefined();
        });
        it('Destroy method defined in controllers', ()=> {
          expect(usrModel.destroy).toBeDefined();
        });
        it('Authenticate method defined in controllers', ()=> {
          expect(usrModel.authenticate).toBeDefined();
        });
    });
    afterAll(async()=>{
        const connection = await  client.connect()
        await connection.query('delete from users;\n alter sequence users_id_seq restart with 1;')
        connection.release()
    })
})

   //
    // beforeAll(async()=>{
    //     const usr: User = {user_name: "usr", password: 'pw'}
    //     const  created = await usrModel.create(usr)
    //     console.log('User Created Successfully ===>>>',created)
    // })