import client from '../../database'
import {OrderDetails, Order, User, Product} from "../../types";
import supertest from "supertest";
import {app} from "../../server";
import {OrderModel} from "../../models/order";
import {UserModel} from "../../models/user";
import {ProductModel} from "../../models/product";
import {OrderDetailsModel} from "../../models/orderDetails";
import {createToken} from "../../utils/jwtAuth";
import {stringify} from "querystring";
import {usrList} from "../../models/__tests__/orderSpec";



const userModel = new UserModel()
const request = supertest(app)
const orderModel = new OrderModel()
const productModel = new ProductModel()
const orderDetails = new OrderDetailsModel()
const itemProduct: Product = {
    name: 'Samsung',
    price: 10000,
    category: 'Korean Products'
}
let user: User;
let TOKEN: string;
describe('Testing Orders Endpoints------------------$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4', ()=>{
    beforeAll(async () => {
        try{
            const connection = await client.connect();
                await connection.query('delete from users;\n alter sequence users_id_seq restart with 1;')
                await connection.query('delete from products;\n alter sequence products_id_seq restart with 1;');
                await connection.query('delete from orders;\n alter sequence orders_id_seq restart with 1;')
                await connection.query('delete from order_details;\n alter sequence order_Details_id_seq restart with 1;')
                    connection.release();
        }catch (e) {
            throw new Error(`${e}`)
        }
    })
      
    // it('_-_____-----_________---_____---_____----_____---__', async ()=> {
// const userItem = {id: 100, user_name: 's', password: 's'}
//             await userModel.create(userItem)
//             TOKEN = createToken(stringify(userItem));
//             const result = await (await request.post('/users/create').send(userItem)).body;
//             user = result.user
    //     const product = await productModel.createProduct(itemProduct)
    //     // id=1
    //     const order = await orderModel.createOrder({status: 'active', user_id: user.id})
    //     const addedOrder = await request.
    //     post('/orders/create')
    //     .set('Authorization', `Bearer ${TOKEN}`)
    //     .send(order)
    //
    //
    //     const orderDetailsItem = await orderDetails.create({product_id: product.id, quantity: 7, order_id: order.id})
    //     const result = await request
    //         .post('/order_details/create')
    //         .set('Authorization', 'Bearer '+`${TOKEN}`)
    //         .send(orderDetailsItem)
    //
    //     expect(result.status).toBe(200)
    // });

    afterAll(async () => {
        try{
            const connection = await client.connect();
            await connection.query('delete from order_details;\n alter sequence order_Details_id_seq restart with 1;')
            await connection.query('delete from products;\n alter sequence products_id_seq restart with 1;');
            await connection.query('delete from orders;\n alter sequence orders_id_seq restart with 1;')
            await connection.query('delete from users;\n alter sequence users_id_seq restart with 1;')
            connection.release();
        }catch (e) {
            throw new Error(`${e}`)
        }
    })
})