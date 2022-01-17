import { OrderModel } from '../order';
import dotenv from 'dotenv'
import client from '../../database';
import {Order, User} from '../../types'
import bcrypt from "bcrypt";
import {UserModel} from "../user";
import _ from "lodash";


const usrList: User[] = [{user_name: 's', first_name: 's', last_name: 's', password: 's'}]
export const lWithIds = usrList.map((u, i) => {
    return {
        id: i + 1 ,
        ..._.pick(u, ['user_name', 'first_name', 'last_name'])
    };
});
const orderList: Order[] = [
    {status: 'active', user_id: lWithIds[0].id},
];

const orderListWithId = orderList.map((o, i) => {
    o.id = i + 1;
    return o;
});

dotenv.config()

const orderModel = new OrderModel();
const userInstance = new UserModel()

describe('Order Model Instance', () => {
    describe('Testing Order instance method functionalities:', async()=>{
        beforeAll(async () => {
            const connection = await client.connect();
            for (const usr of usrList) {
                const encryptedPassword = bcrypt.hashSync(
                    usr.password + process.env.PEPPER,
                    parseInt(process.env.SALT_ROUNDS as unknown as string)
                );
                await connection.query(
                    'insert into users (user_name, first_name, last_name, password) values ($1,$2,$3,$4);',
                    [
                        usr.user_name,
                        usr.first_name,
                        usr.last_name,
                        encryptedPassword
                    ]
                );
            }
            connection.release();
        });
        it('Order Create', async () => {
            await userInstance.create(usrList[0]);
            const createdOrder: Order = await orderModel.createOrder(orderList[0]);
            expect(createdOrder.id).toBe(1)
            expect(createdOrder.user_id).toContain(1)
            expect(createdOrder.status).toEqual('active')
            expect(orderListWithId.length).toBe(1)
        });
    })


    describe('Orders Model Methods Existence', () => {
        it('Testing Order instance methods existence:', () => {
            expect(orderModel.createOrder).toBeDefined();
        });
        it('Index: existed', () => {
            expect(orderModel.index).toBeDefined();
        });
        it('Show: existed', () => {
            expect(orderModel.show).toBeDefined();
        });
        it('Update: existed', () => {
            expect(orderModel.update).toBeDefined();
        });
        it('Delete: existed', () => {
            expect(orderModel.destroy).toBeDefined();
        });
        it('Order BY User ID: existed', () => {
            expect(orderModel.ordByUsrId).toBeDefined();
        });
    });

    afterAll(async () => {
        const connection = await client.connect();
        await connection.query(
            'delete from orders;\nALTER sequence orders_id_seq RESTART WITH 1;\n DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1'
        );
        connection.release();
    });
});



// import { OrderModel } from '../order';
// import dotenv from 'dotenv'
// import client from '../../database';
// import {Order, Product, User} from '../../types'
// import bcrypt from "bcrypt";
// import {UserModel} from "../user";
// import _ from "lodash";
//
//
// const usrList: User[] = [{user_name: 's', first_name: 's', last_name: 's', password: 's'}]
// export const lWithIds = usrList.map((u, i) => {
//     return {
//         id: i + 1 ,
//         ..._.pick(u, ['user_name', 'first_name', 'last_name'])
//     };
// });
// const orderList: Order[] = [
//     {status: 'active', user_id: lWithIds[0].id},
// ];
//
// const orderListWithId = orderList.map((o, i) => {
//     o.id = i + 1;
//     return o;
// });
//
// dotenv.config()
//
// const orderModel = new OrderModel();
// const userInstance = new UserModel()
//
// describe('Order Model Instance', () => {
//     describe('--------------------------------------', async()=>{
//         beforeAll(async () => {
//             const connection = await client.connect();
//             for (const usr of usrList) {
//                 const encryptedPassword = bcrypt.hashSync(
//                     usr.password + process.env.PEPPER,
//                     parseInt(process.env.SALT_ROUNDS as unknown as string)
//                 );
//                 await connection.query(
//                     'insert into users (user_name, first_name, last_name, password) values ($1,$2,$3,$4);',
//                     [
//                         usr.user_name,
//                         usr.first_name,
//                         usr.last_name,
//                         encryptedPassword
//                     ]
//                 );
//             }
//             connection.release();
//         });
//         it('Order Create &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&', async () => {
//             const newUsr: User = await userInstance.create(usrList[0]);
//             const ID = newUsr.id
//             console.log('-------------ID    ----------------->>>>>>>>>>>>>>>>>>>', ID)
//             const item: Order = await orderModel.createOrder({
//                 status: 'active',
//                 user_id: ID as number
//             });
//             expect(item).toEqual({
//                 id: 1,
//                 status: 'active',
//                 user_id: 2
//             });
//         });
//     })
//
//
//     describe('Orders Model Methods Existence', () => {
//         it('Testing Order instance methods existence:', () => {
//             expect(orderModel.createOrder).toBeDefined();
//         });
//         it('Index: existed', () => {
//             expect(orderModel.index).toBeDefined();
//         });
//         it('Show: existed', () => {
//             expect(orderModel.show).toBeDefined();
//         });
//         it('Update: existed', () => {
//             expect(orderModel.update).toBeDefined();
//         });
//         it('Delete: existed', () => {
//             expect(orderModel.destroy).toBeDefined();
//         });
//         it('Order BY User ID: existed', () => {
//             expect(orderModel.ordByUsrId).toBeDefined();
//         });
//     });
//
//     afterAll(async () => {
//         const connection = await client.connect();
//         await connection.query(
//             'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\n DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1'
//         );
//         connection.release();
//     });
// });
