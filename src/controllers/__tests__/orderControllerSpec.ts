// import { app } from '../../server'
// import bcrypt from 'bcrypt'
// import {User} from '../../types'
// import {UserModel} from "../../models/user";
// import {usrList} from "../../models/__tests__/userSpec";
// import client from '../../database'
// import supertest from "supertest";
// import {createToken, verifyToken} from "../../utils/jwtAuth";
//
// const request = supertest(app)
// const testUser: User =  {user_name: 't', password: 't'}
// const token = createToken(testUser.user_name)
// describe('Orders controller', () => {
//   beforeAll(async () => {
//     const userModel = new UserModel();
//     await userModel.create(testUser);
//   });
//
//   it('posts on /orders: returns an active order in JSON format', async () => {
//     const response = await request
//       .post('/orders/create')
//       .set('Authorization', `Bearer ${token}`)
//       .send({ user_id: 1 });
//
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({
//       id: 1,
//       currentStatus: 'active',
//       user_id: 1
//
//     });
//   });
//
//   it('gets /orders/users/:userId/active: returns an active order in JSON format', async () => {
//     const response = await request
//       .get('/orders/user/1')
//       .set('Authorization', `Bearer ${token}`);
//
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({
//       id: 1,
//       status: 'active',
//         user_id: 1
//     });
//   });
//
//
//
//   // afterAll(async () => {
//   //   const connection = await client.connect();
//   //   await connection.query('DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM orders\n ALTER SEQUENCE orders_id_seq RESTART WITH 1');
//   //   connection.release();
//   // });
// });
