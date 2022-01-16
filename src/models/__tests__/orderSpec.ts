import { OrderModel } from '../order';
import { UserModel } from '../user';
import supertest from 'supertest';
import { app } from '../../server';
import client from '../../database';
const orderModel = new OrderModel();
const userModel = new UserModel();
const request = supertest(app);

describe('Order Model Instance', () => {
    describe('', () => {
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
            'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1'
        );
        connection.release();
    });
});
